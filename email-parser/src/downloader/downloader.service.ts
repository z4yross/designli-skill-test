import { Injectable } from '@nestjs/common';

@Injectable()
export class DownloaderService {
    async downloadFile(url: string): Promise<string> {
        try {
            const res = await fetch(url);
            const text = await res.text();
            return text;
        } catch (error) {
            // console.error(error);
            return null;
        }
    }
}
