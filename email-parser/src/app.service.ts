import { Injectable } from '@nestjs/common';
import { ParserService } from './parser/parser.service';
import { FileReaderService } from './file-reader/file-reader.service';

@Injectable()
export class AppService {
    constructor(
        private readonly parserService: ParserService,
        private readonly fileReaderService: FileReaderService,
    ) {}

    async getJsonFromEmail(mailPathOrUrl: string): Promise<string[]> {
        const mail = await this.parserService.parseEmail(mailPathOrUrl);
        const jsons = await this.fileReaderService.getJsonFromEmail(mail);

        if (jsons.length === 1) return JSON.parse(jsons[0]);
        
        return jsons;
    }
}
