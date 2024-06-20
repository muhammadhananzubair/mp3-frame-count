import { Injectable } from '@nestjs/common';

@Injectable()
export class Mp3ParserService {
  countMP3Frames(fileBuffer: Buffer): number {
    const bufferLength = fileBuffer.length;
    let offset = 0;
    let frameCount = 0;

    while (offset < bufferLength) {
      if (bufferLength - offset < 4) break;

      // Check if we found a frame header
      if (
        fileBuffer[offset] === 0xff &&
        (fileBuffer[offset + 1] & 0xe0) === 0xe0
      ) {
        frameCount++;

        // Calculate frame length
        const bitRateIndex = (fileBuffer[offset + 2] & 0xf0) >> 4;
        const sampleRateIndex = (fileBuffer[offset + 2] & 0x0c) >> 2;
        const paddingBit = (fileBuffer[offset + 2] & 0x02) >> 1;

        // Define bit rate and sample rate tables based on MPEG version 1, Layer III
        const bitRates = [
          0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320,
        ];
        const sampleRates = [44100, 48000, 32000];

        const bitRate = bitRates[bitRateIndex] * 1000;
        const sampleRate = sampleRates[sampleRateIndex];

        if (bitRate === 0 || sampleRate === undefined) break;

        // Frame length calculation for MPEG 1 Layer III
        const frameLength = Math.floor(
          (144 * bitRate) / sampleRate + paddingBit,
        );

        offset += frameLength;
      } else {
        offset++;
      }
    }
    return frameCount;
  }
}
