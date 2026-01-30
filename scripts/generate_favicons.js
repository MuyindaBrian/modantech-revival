import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const PUBLIC = path.join(process.cwd(), 'public');
const SVG = path.join(PUBLIC, 'favicon.svg');
const OUT_ICO = path.join(PUBLIC, 'favicon.ico');

(async () => {
  try {
    // sizes for ICO
    const sizes = [16, 32, 48, 64];
    const pngBuffers = [];

    for (const size of sizes) {
      const buf = await sharp(SVG).resize(size, size).png().toBuffer();
      pngBuffers.push(buf);
    }

    const ico = await pngToIco(pngBuffers);
    await fs.writeFile(OUT_ICO, ico);
    console.log('favicon.ico generated at', OUT_ICO);
  } catch (err) {
    console.error('Failed to generate favicon.ico:', err);
    process.exit(1);
  }
})();
