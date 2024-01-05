import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RecordsDto } from './dto/records.dto';
import { MappedRecord } from './dto/mapped.dto';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Post('records')
    mapRecords(@Body() records: RecordsDto): MappedRecord {
        return this.appService.mapRecords(records);
    }
}
