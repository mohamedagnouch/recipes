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

let minX = width, maxX = 0, minY = height, maxY = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (y * width + x) * 4;
    const alpha = rawData[idx + 3];
    if (alpha > 20) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

console.log('Real Content Bounding Box:', { minX, maxX, minY, maxY, w: maxX - minX + 1, h: maxY - minY + 1 });

// CRC32 table
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = ((c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1));
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ (-1)) >>> 0;
}

function createChunk(type, chunkData) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(chunkData.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  const crcData = Buffer.concat([typeBuf, chunkData]);
  const crc = crc32(crcData);
  crcBuf.writeUInt32BE(crc >>> 0, 0);
  return Buffer.concat([len, typeBuf, chunkData, crcBuf]);
}

function writePNG(w, h, data) {
  const s = 1 + w * 4;
  const rawBuf = Buffer.alloc(h * s);
  for (let y = 0; y < h; y++) {
    rawBuf[y * s] = 0;
    for (let x = 0; x < w; x++) {
      const srcIdx = (y * w + x) * 4;
      const dstIdx = y * s + 1 + x * 4;
      rawBuf[dstIdx] = data[srcIdx];
      rawBuf[dstIdx + 1] = data[srcIdx + 1];
      rawBuf[dstIdx + 2] = data[srcIdx + 2];
      rawBuf[dstIdx + 3] = data[srcIdx + 3];
    }
  }
  const def = zlib.deflateSync(rawBuf);
  const pngHeader = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(w, 0);
  ihdrData.writeUInt32BE(h, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6;
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;

  return Buffer.concat([
    pngHeader,
    createChunk('IHDR', ihdrData),
    createChunk('IDAT', def),
    createChunk('IEND', Buffer.alloc(0))
  ]);
}

// Crop with slight horizontal and vertical margin (10px)
const padX = 10;
const padY = 10;
const cropMinX = Math.max(0, minX - padX);
const cropMaxX = Math.min(width - 1, maxX + padX);
const cropMinY = Math.max(0, minY - padY);
const cropMaxY = Math.min(height - 1, maxY + padY);
const cropW = cropMaxX - cropMinX + 1;
const cropH = cropMaxY - cropMinY + 1;

const croppedBuffer = Buffer.alloc(cropW * cropH * 4);
for (let y = 0; y < cropH; y++) {
  for (let x = 0; x < cropW; x++) {
    const srcIdx = ((cropMinY + y) * width + (cropMinX + x)) * 4;
    const dstIdx = (y * cropW + x) * 4;
    croppedBuffer[dstIdx] = rawData[srcIdx];
    croppedBuffer[dstIdx + 1] = rawData[srcIdx + 1];
    croppedBuffer[dstIdx + 2] = rawData[srcIdx + 2];
    croppedBuffer[dstIdx + 3] = rawData[srcIdx + 3];
  }
}

const croppedPng = writePNG(cropW, cropH, croppedBuffer);
fs.writeFileSync('public/images/dishora-logo.png', croppedPng);
fs.writeFileSync('public/images/dishora-logo-transparent.png', croppedPng);
fs.writeFileSync('public/dishora-logo.png', croppedPng);
fs.writeFileSync('public/images/logo.png', croppedPng);
fs.writeFileSync('public/logo.png', croppedPng);

console.log('Saved cropped transparent PNG:', { cropW, cropH });
