import { Injectable } from '@nestjs/common';

import fs from 'fs';
import path from 'path';

@Injectable()
export class FileReaderService {

	getFile(filePath: string): string {
		try {
			const file = fs.readFileSync(path.resolve(filePath), 'utf8');
			return file;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}
