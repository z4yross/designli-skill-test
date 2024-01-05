import { Module } from '@nestjs/common';
import { FileReaderService } from './file-reader.service';

@Module({
  providers: [FileReaderService],
  
})
export class FileReaderModule {}
