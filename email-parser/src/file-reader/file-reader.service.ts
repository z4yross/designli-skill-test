import { Injectable } from '@nestjs/common';

import * as MailParser from 'mailparser';
import { DownloaderService } from 'src/downloader/downloader.service';
import { ParserService } from 'src/parser/parser.service';

@Injectable()
export class FileReaderService {
    constructor(
        private readonly parserService: ParserService,
        private readonly downloaderService: DownloaderService,
    ) {}

    private checkIfJsonInAttachments(mail: MailParser.ParsedMail) {
        if (!mail.attachments || mail.attachments.length === 0) return [];

        const JSONAttachments =
            this.parserService.parseBufferedAttachments(mail);
        return JSONAttachments;
    }

    private async checkIfJsonInWebSite(website: string): Promise<string[]> {
        const urls = this.parserService.extractUrlsFromText(website);

        if (urls === null || urls.length === 0) return [];

        const jsons = await Promise.all(
            urls.map(async (url) => {
                const text = await this.downloaderService.downloadFile(url);
                if (this.parserService.isJSON(text)) return text;
            }),
        );

        return jsons;
    }

    private async checkIfJsonInBody(
        mail: MailParser.ParsedMail,
    ): Promise<string[]> {
        const urls = this.parserService.extractUrlsFromText(mail.text);

        if (urls === null || urls.length === 0) return [];

        let jsons = [];

        for (const url of urls) {
            const text = await this.downloaderService.downloadFile(url);
            if (this.parserService.isJSON(text)) jsons.push(text);
            else jsons.push(...(await this.checkIfJsonInWebSite(text)));
        }

        return jsons;
    }

    async getJsonFromEmail(mail: MailParser.ParsedMail): Promise<string[]> {
        let jsons = [];

        const JSONAttachments = this.checkIfJsonInAttachments(mail);

        const JSONBody = await this.checkIfJsonInBody(mail);

        jsons.push(...JSONAttachments);
        jsons.push(...JSONBody);

        return jsons;
    }
}
