const ffmpegPath = require('ffmpeg-static');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const videoPath = path.join(__dirname, '../public/imagine-ef96d055.mp4');
const outDir = path.join(__dirname, '../public/hero-frames');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Ensure the video exists
if (!fs.existsSync(videoPath)) {
  console.error("Video not found:", videoPath);
  process.exit(1);
}

console.log("Extracting frames to WebP...");
// -vf fps=30 (force 30fps to ensure consistent frame count)
// -qscale:v 70 (high quality webp compression)
// -scale 1920:-1 (scale width to 1920px max for performance, keeping aspect ratio)
try {
  // We use WebP to save huge amounts of bandwidth and memory.
  execSync(`"${ffmpegPath}" -i "${videoPath}" -vf "fps=30,scale='min(1920,iw)':-1" -c:v libwebp -quality 80 "${outDir}/frame_%04d.webp"`, {
    stdio: 'inherit'
  });
  console.log("Frame extraction complete!");
} catch (e) {
  console.error("FFmpeg failed:", e.message);
}
