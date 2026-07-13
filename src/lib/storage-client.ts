import { createClient } from "@supabase/supabase-js";

// Ensure these exist in your .env
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn("Missing Supabase credentials for Storage. File uploads may fail.");
}

export const supabase = createClient(
  supabaseUrl || "https://mock.supabase.co", 
  supabaseKey || "mock-key-12345"
);

/**
 * Uploads a buffer to Supabase Storage and returns the public URL.
 * 
 * @param buffer - The file buffer to upload (e.g. from an API response)
 * @param filename - The target filename in the bucket
 * @param contentType - e.g. "audio/mpeg" or "video/mp4"
 * @param bucket - The storage bucket name (default: "1imp-media")
 * @returns The public URL of the uploaded file
 */
export async function uploadToStorage(
  buffer: ArrayBuffer | Buffer,
  filename: string,
  contentType: string,
  bucket: string = "1imp-media"
): Promise<string> {
  if (!supabaseUrl || !supabaseKey) {
    console.warn("[Storage Client] Missing credentials. Returning mock URL for", filename);
    return `https://mock.supabase.co/storage/v1/object/public/${bucket}/${filename}`;
  }

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filename, buffer, {
      contentType,
      upsert: true,
    });

  if (error) {
    console.error("[Storage Client] Upload error:", error);
    throw new Error(`Failed to upload file to storage: ${error.message}`);
  }

  // Get the public URL
  const { data: publicUrlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(filename);

  return publicUrlData.publicUrl;
}
