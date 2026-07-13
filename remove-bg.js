const Jimp = require('jimp');

async function removeWhiteBg() {
  const imagePath = 'public/3d-icons/purple_shuriken.png';
  const image = await Jimp.read(imagePath);
  
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
    const red = this.bitmap.data[idx + 0];
    const green = this.bitmap.data[idx + 1];
    const blue = this.bitmap.data[idx + 2];
    
    // If pixel is very close to white, make it transparent
    if (red > 240 && green > 240 && blue > 240) {
      this.bitmap.data[idx + 3] = 0; // alpha to 0
    }
  });

  await image.writeAsync('public/3d-icons/purple_shuriken_transparent.png');
  console.log('Done removing background!');
}

removeWhiteBg().catch(console.error);
