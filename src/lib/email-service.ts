import { Resend } from 'resend';
import { prisma } from '@/lib/prisma';

// Initialize Resend
// We'll use a dummy key if not provided in env for local dev to avoid crashing
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_for_dev');

export async function sendVideoProcessingEmail(email: string, userName: string) {
  try {
    const config = await prisma.systemConfig.findUnique({
      where: { key: "EMAIL_VIDEO_PROCESSING_HTML" }
    });
    
    let htmlContent = config?.value || `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Hi {{userName}},</h2>
          <p>We've received your CV and our AI is currently generating your professional video.</p>
          <p>This usually takes about 2-3 minutes. We'll send you another email as soon as your free preview is ready!</p>
          <br/>
          <p>Best,</p>
          <p>The 1IMP Team</p>
        </div>
      `;
    
    htmlContent = htmlContent.replace(/\{\{userName\}\}/g, userName);

    await resend.emails.send({
      from: 'noreply@resend.dev',
      to: email,
      subject: 'Your 1IMP Video is Rendering 🎬',
      html: htmlContent
    });
  } catch (error) {
    console.error('Failed to send processing email', error);
  }
}

export async function sendVideoReadyEmail(email: string, userName: string, videoUrl: string) {
  try {
    const config = await prisma.systemConfig.findUnique({
      where: { key: "EMAIL_VIDEO_READY_HTML" }
    });
    
    let htmlContent = config?.value || `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Hi {{userName}},</h2>
          <p>Your AI-generated first impression video is ready for preview.</p>
          <p><a href="{{videoUrl}}" style="background-color: #E8355A; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Your Video</a></p>
          <p>You can upgrade to Premium to remove the watermark and download the HD version.</p>
          <br/>
          <p>Best,</p>
          <p>The 1IMP Team</p>
        </div>
      `;
      
    htmlContent = htmlContent.replace(/\{\{userName\}\}/g, userName).replace(/\{\{videoUrl\}\}/g, videoUrl);

    await resend.emails.send({
      from: 'noreply@resend.dev',
      to: email,
      subject: 'Your 1IMP Video is Ready! 🎉',
      html: htmlContent
    });
  } catch (error) {
    console.error('Failed to send ready email', error);
  }
}

export async function sendUpgradeSuccessfulEmail(email: string, userName: string, videoUrl: string) {
  try {
    const config = await prisma.systemConfig.findUnique({
      where: { key: "EMAIL_UPGRADE_SUCCESS_HTML" }
    });
    
    let htmlContent = config?.value || `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Hi {{userName}},</h2>
          <p>Thank you for upgrading to 1IMP Premium!</p>
          <p>Your clean, high-definition video is now unlocked and ready to be downloaded or shared.</p>
          <p><a href="{{videoUrl}}" style="background-color: #34A853; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Access Your HD Video</a></p>
          <br/>
          <p>Best,</p>
          <p>The 1IMP Team</p>
        </div>
      `;
      
    htmlContent = htmlContent.replace(/\{\{userName\}\}/g, userName).replace(/\{\{videoUrl\}\}/g, videoUrl);

    await resend.emails.send({
      from: 'noreply@resend.dev',
      to: email,
      subject: 'Welcome to Premium! Your HD Video is Unlocked 🔓',
      html: htmlContent
    });
  } catch (error) {
    console.error('Failed to send upgrade email', error);
  }
}
