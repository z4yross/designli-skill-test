import { DownloaderService } from './../downloader/downloader.service';
import { Injectable } from '@nestjs/common';

import * as MailParser from 'mailparser';

import * as fs from 'fs';
import * as path from 'path';

import * as https from 'https';

@Injectable()
export class ParserService {
    private options: MailParser.MailParserOptions;

    constructor(private readonly downloaderService: DownloaderService) {
        this.options = {
            skipImageLinks: true,
            skipHtmlToText: true,
        };
    }

    async readEmail(emailPath: string): Promise<string> {
        let file: string;
        try {
            file = fs.readFileSync(path.resolve(emailPath), 'utf8');
            return file;
        } catch (error) {
            try {
                file = await this.downloaderService.downloadFile(emailPath);
                return file;
            } catch (error) {
                console.error(error);
                return null;
            }
        }
    }

    async parseEmail(emailPath: string): Promise<MailParser.ParsedMail> {
        const email = await this.readEmail(emailPath);
        const parser = await MailParser.simpleParser(email, this.options);
        return parser;
    }

    parseBufferedAttachments(mail: MailParser.ParsedMail): string[] {
        if (!mail.attachments || mail.attachments.length === 0) return null;

        const contents = mail.attachments.map((attachment) => {
            if (attachment.contentType === 'application/json') {
                const text = attachment.content.toString('utf8');
                if (this.isJSON(text)) return text;
            }
        });

        return contents;
    }

    extractUrlsFromText(text: string): string[] {
        const urlRegex = /((https?:\/\/)|(www\.))[^\s\n]+/g;
        const urls = text.match(urlRegex);
        return urls;
    }

    isJSON(str: string): boolean {
        try {
            JSON.parse(str);
            return true;
        } catch (error) {
            return false;
        }
    }
}
