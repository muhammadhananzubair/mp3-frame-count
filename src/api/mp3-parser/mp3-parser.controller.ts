import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MULTER_CONFIG } from 'src/config/multer/multer.config';
import { Mp3ParserService } from './mp3-parser.service';

@Controller('file-upload')
@ApiTags('MP3 Frame Count')
export class Mp3ParserController {
  constructor(private readonly mp3FrameParserService: Mp3ParserService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 200 })
  @UseInterceptors(FileInterceptor('file', MULTER_CONFIG))
  uploadFile(@UploadedFile() file: any): { frameCount: number } {
    if (!file) {
      throw new Error('No file uploaded.');
    }

    const frameCount = this.mp3FrameParserService.countMP3Frames(file.buffer);
    return { frameCount };
  }
}
