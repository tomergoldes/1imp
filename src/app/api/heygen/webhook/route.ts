import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendVideoReadyEmail } from "@/lib/email-service";

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    console.log("[HeyGen Webhook] Received:", JSON.stringify(payload));

    // HeyGen webhook structure for video success:
    // { "event_type": "video.success" (or avatar_video.success), "data": { "video_id": "...", "video_url": "..." }, "callback_id": "our_db_id" }
    
    // Check if this is a video completion event
    if (payload.event_type === "avatar_video.success" || payload.event_type === "video.success") {
      const { video_id, video_url } = payload.data || {};
      const callback_id = payload.callback_id;

      if (!video_url) {
        console.error("[HeyGen Webhook] Missing video_url in payload");
        return NextResponse.json({ error: "Missing video_url" }, { status: 400 });
      }

      // Find the video in our database
      // Try callback_id first, fallback to searching by heygenId
      let video;
      if (callback_id) {
        video = await prisma.video.findUnique({ where: { id: callback_id } });
      }
      
      if (!video && video_id) {
        video = await prisma.video.findFirst({ where: { heygenId: video_id } });
      }

      if (!video) {
        console.error("[HeyGen Webhook] Video not found in DB for ID:", callback_id || video_id);
        return NextResponse.json({ error: "Video not found" }, { status: 404 });
      }

      if (video.status === "COMPLETED") {
        console.log("[HeyGen Webhook] Video already processed:", video.id);
        return NextResponse.json({ success: true });
      }

      // Update the video record in the DB
      await prisma.video.update({
        where: { id: video.id },
        data: {
          videoUrl: video_url,
          status: "COMPLETED",
          // Free video is initially watermarked in UI (hasWatermark=true)
        }
      });

      // Send the email to the user
      const user = await prisma.user.findUnique({ where: { id: video.userId } });
      if (user) {
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
        await sendVideoReadyEmail(user.email, user.name || "User", `${baseUrl}/v/${video.id}`);
        console.log("[HeyGen Webhook] Sent ready email to:", user.email);
      }

      return NextResponse.json({ success: true });
    }

    // Handle failure event
    if (payload.event_type === "avatar_video.failed" || payload.event_type === "video.failed") {
       console.error("[HeyGen Webhook] Video generation failed:", payload);
       const { video_id } = payload.data || {};
       const callback_id = payload.callback_id;
       
       let videoId = callback_id;
       if (!videoId && video_id) {
          const v = await prisma.video.findFirst({ where: { heygenId: video_id } });
          if (v) videoId = v.id;
       }

       if (videoId) {
         await prisma.video.update({
           where: { id: videoId },
           data: { status: "FAILED" }
         });
       }
       return NextResponse.json({ success: true });
    }

    // Acknowledge other events without processing
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[HeyGen Webhook] Error processing webhook:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
