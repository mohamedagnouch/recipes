const fs = require('fs');
const zlib = require('zlib');

function parsePNG(buffer) {
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
  
  // Parse scanlines (RGBA)
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
        // None
      } else if (filterType === 1) {
        // Sub
        val = (val + a) & 0xff;
      } else if (filterType === 2) {
        // Up
        val = (val + b) & 0xff;
      } else if (filterType === 3) {
        // Average
        val = (val + Math.floor((a + b) / 2)) & 0xff;
      } else if (filterType === 4) {
        // Paeth
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

  return { width, height, data: rawData };
}

function writePNG(width, height, data, makeTransparent = false) {
  // data is RGBA buffer
  const stride = 1 + width * 4;
  const rawBuffer = Buffer.alloc(height * stride);

  for (let y = 0; y < height; y++) {
    rawBuffer[y * stride] = 0; // Filter 0: None
    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * 4;
      const dstIdx = y * stride + 1 + x * 4;
      let r = data[srcIdx];
      let g = data[srcIdx + 1];
      let b = data[srcIdx + 2];
      let a = data[srcIdx + 3];

      if (makeTransparent) {
        // If near white, set alpha to 0
        if (r > 240 && g > 240 && b > 240) {
          a = 0;
        } else if (r > 200 && g > 200 && b > 200) {
          // smooth edge
          const brightness = (r + g + b) / 3;
          const factor = (255 - brightness) / 55;
          a = Math.min(255, Math.max(0, Math.round(a * factor)));
        }
      }

      rawBuffer[dstIdx] = r;
      rawBuffer[dstIdx + 1] = g;
      rawBuffer[dstIdx + 2] = b;
      rawBuffer[dstIdx + 3] = a;
    }
  }

  const deflated = zlib.deflateSync(rawBuffer);

  // Build PNG chunks
  function createChunk(type, chunkData) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(chunkData.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crcBuf = Buffer.alloc(4);
    
    // CRC calculation
    const crcData = Buffer.concat([typeBuf, chunkData]);
    const crc = crc32(crcData);
    crcBuf.writeUInt32BE(crc >>> 0, 0);
    return Buffer.concat([len, typeBuf, chunkData, crcBuf]);
  }

  const pngHeader = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 6; // color type RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace

  const ihdrChunk = createChunk('IHDR', ihdrData);
  const idatChunk = createChunk('IDAT', deflated);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([pngHeader, ihdrChunk, idatChunk, iendChunk]);
}

// CRC32 implementation
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

// Execute
const inputBuf = fs.readFileSync('public/images/dishora-logo.png');
const parsed = parsePNG(inputBuf);

// Find bounding box
let minX = parsed.width, maxX = 0, minY = parsed.height, maxY = 0;
for (let y = 0; y < parsed.height; y++) {
  for (let x = 0; x < parsed.width; x++) {
    const idx = (y * parsed.width + x) * 4;
    const r = parsed.data[idx];
    const g = parsed.data[idx + 1];
    const b = parsed.data[idx + 2];
    // Check if not white background
    if (r < 235 || g < 235 || b < 235) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

console.log('Bounding Box:', { minX, maxX, minY, maxY, width: maxX - minX + 1, height: maxY - minY + 1 });

// Crop with padding
const padding = 20;
const cropMinX = Math.max(0, minX - padding);
const cropMaxX = Math.min(parsed.width - 1, maxX + padding);
const cropMinY = Math.max(0, minY - padding);
const cropMaxY = Math.min(parsed.height - 1, maxY + padding);

const cropW = cropMaxX - cropMinX + 1;
const cropH = cropMaxY - cropMinY + 1;

const croppedData = Buffer.alloc(cropW * cropH * 4);
for (let y = 0; y < cropH; y++) {
  for (let x = 0; x < cropW; x++) {
    const srcIdx = ((cropMinY + y) * parsed.width + (cropMinX + x)) * 4;
    const dstIdx = (y * cropW + x) * 4;
    croppedData[dstIdx] = parsed.data[srcIdx];
    croppedData[dstIdx + 1] = parsed.data[srcIdx + 1];
    croppedData[dstIdx + 2] = parsed.data[srcIdx + 2];
    croppedData[dstIdx + 3] = parsed.data[srcIdx + 3];
  }
}

// Generate cropped with transparent background
const transparentCroppedPng = writePNG(cropW, cropH, croppedData, true);
fs.writeFileSync('public/images/dishora-logo.png', transparentCroppedPng);
fs.writeFileSync('public/images/dishora-logo-transparent.png', transparentCroppedPng);
fs.writeFileSync('public/dishora-logo.png', transparentCroppedPng);
fs.writeFileSync('public/images/logo.png', transparentCroppedPng);

// Also generate a white background cropped version
const whiteCroppedPng = writePNG(cropW, cropH, croppedData, false);
fs.writeFileSync('public/images/dishora-logo-white-bg.png', whiteCroppedPng);

console.log('Successfully cropped and saved Dishora logos!', { cropW, cropH });
