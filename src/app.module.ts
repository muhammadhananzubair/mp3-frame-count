import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Mp3ParserModule } from './api/mp3-parser/mp3-parser.module';

@Module({
  imports: [Mp3ParserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
