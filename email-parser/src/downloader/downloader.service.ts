import { Injectable } from '@nestjs/common';

import * as https from 'https';

@Injectable()
export class DownloaderService {
    async downloadFile(url: string): Promise<string> {
        return new Promise((resolve, reject) => {
            https
                .get(url, (response) => {
                    let data = '';

                    response.on('data', (chunk) => {
                        data += chunk;
                    });

                    response.on('end', () => {
                        resolve(data);
                    });
                })
                .on('error', (error) => {
                    reject(error);
                });
        });
    }
}
