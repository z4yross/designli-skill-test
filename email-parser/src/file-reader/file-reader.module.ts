import { Module } from '@nestjs/common';
import { FileReaderService } from './file-reader.service';
import { ParserModule } from 'src/parser/parser.module';

@Module({
    providers: [FileReaderService],
    imports: [ParserModule],
})
export class FileReaderModule {}
