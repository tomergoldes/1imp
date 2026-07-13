const ffmpegPath = require('ffmpeg-static');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const videoPath = path.join(__dirname, '../public/demo-video.mp4');
const outDir = path.join(__dirname, '../public/demo-frames');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
} else {
  // clear directory
  const files = fs.readdirSync(outDir);
  for (const file of files) {
    fs.unlinkSync(path.join(outDir, file));
  }
}

console.log('Extracting frames from demo-video...');
try {
  // Since we want to remove the #F4F2FC background, we can use an ffmpeg filter.
  // We'll use chromakey to remove #F4F2FC. We'll output as PNG/WebP with alpha.
  // F4F2FC is RGB(244, 242, 252)
  execSync(`"${ffmpegPath}" -i "${videoPath}" -vf "fps=24,scale=800:-1,colorkey=0xF4F2FC:0.05:0.05,format=rgba" -c:v libwebp -lossless 0 -q:v 75 "${path.join(outDir, 'frame_%04d.webp')}"`, { stdio: 'inherit' });
  console.log('Extraction complete!');
} catch (e) {
  console.error('Extraction failed', e);
}
