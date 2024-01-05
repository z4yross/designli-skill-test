import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { FileReaderService } from './file-reader/file-reader.service';
import { ParserService } from './parser/parser.service';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly fileReaderService: FileReaderService,
        private readonly parserService: ParserService,
    ) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Post('parse')
    async parseEmail(@Body() body: { path: string }): Promise<any> {
        const file = this.fileReaderService.getFile(body.path);

        const parsedEmail = await this.parserService.parseEmail(body.email);
        return parsedEmail;
    }
}
