const fs = require('fs');
const zlib = require('zlib');

const buffer = fs.readFileSync('C:\\Users\\admin\\.gemini\\antigravity-ide\\brain\\10060855-48d4-4ae2-a017-152c3279eed8\\.user_uploaded\\media_1789296387566.png');

let pos = 8;
let width, height, bitDepth, colorType;
let idatList = [];
while (pos < buffer.length) {
  const len = buffer.readUInt32BE(pos);
  const type = buffer.toString('ascii', pos + 4, pos + 8);
  const chunkData = buffer.subarray(pos + 8, pos + 8 + len);
  pos += 12 + len;
  if (type === 'IHDR') {
    width = chunkData.readUInt32BE(0);
    height = chunkData.readUInt32BE(4);
    bitDepth = chunkData[8];
    colorType = chunkData[9];
  } else if (type === 'IDAT') {
    idatList.push(chunkData);
  }
}

const compressed = Buffer.concat(idatList);
const decompressed = zlib.inflateSync(compressed);

const bytesPerPixel = 4;
const stride = 1 + width * bytesPerPixel;
const rawData = Buffer.alloc(width * height * 4);

let prevScanline = Buffer.alloc(width * 4);
for (let y = 0; y < height; y++) {
  const filterType = decompressed[y * stride];
  const scanline = decompressed.subarray(y * stride + 1, (y + 1) * stride);
  const reconstructed = Buffer.alloc(width * 4);

  for (let x = 0; x < width * 4; x++) {
    const bpp = 4;
    const a = x >= bpp ? reconstructed[x - bpp] : 0;
    const b = prevScanline[x];
    const c = x >= bpp ? prevScanline[x - bpp] : 0;

    let val = scanline[x];
    if (filterType === 0) {
    } else if (filterType === 1) {
      val = (val + a) & 0xff;
    } else if (filterType === 2) {
      val = (val + b) & 0xff;
    } else if (filterType === 3) {
      val = (val + Math.floor((a + b) / 2)) & 0xff;
    } else if (filterType === 4) {
      const p = a + b - c;
      const pa = Math.abs(p - a);
      const pb = Math.abs(p - b);
      const pc = Math.abs(p - c);
      let pr = c;
      if (pa <= pb && pa <= pc) pr = a;
      else if (pb <= pc) pr = b;
      val = (val + pr) & 0xff;
    }
    reconstructed[x] = val;
    rawData[(y * width * 4) + x] = val;
  }
  prevScanline = reconstructed;
}

// Check sample pixels at corner (0,0), (10,10), center, etc.
console.log('Pixel (0,0):', rawData[0], rawData[1], rawData[2], rawData[3]);
console.log('Pixel (10,10):', rawData[(10*width+10)*4], rawData[(10*width+10)*4+1], rawData[(10*width+10)*4+2], rawData[(10*width+10)*4+3]);
console.log('Pixel (512,512):', rawData[(512*width+512)*4], rawData[(512*width+512)*4+1], rawData[(512*width+512)*4+2], rawData[(512*width+512)*4+3]);

// Teal color check
let tealCount = 0;
let minX = width, maxX = 0, minY = height, maxY = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (y * width + x) * 4;
    const r = rawData[idx];
    const g = rawData[idx + 1];
    const b = rawData[idx + 2];
    
    // Check if pixel is teal/dark text (e.g. not white/near white, like r < 200 or g < 200)
    // The background is likely ~255 255 255.
    const isDark = (r < 210 || g < 210 || b < 210);
    if (isDark) {
      tealCount++;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

console.log({ tealCount, minX, maxX, minY, maxY, w: maxX - minX + 1, h: maxY - minY + 1 });
