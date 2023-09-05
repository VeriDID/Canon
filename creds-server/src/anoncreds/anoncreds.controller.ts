import { Body, Controller, Get, Post } from '@nestjs/common';
import { AnoncredsService } from './anoncreds.service';
import { AnoncredsDto } from './dto/anoncreds.dto';

@Controller('anoncreds')
export class AnoncredsController {
    constructor(private anoncredsService: AnoncredsService) {}
    @Get()
    test(): string {
        return 'Call made to anoncreds controller';
    }

    @Post('create')
    createCredDef(@Body() anoncredsDto: AnoncredsDto): any {
        let creddef = this.anoncredsService.createCredDef(anoncredsDto);
        return creddef;
    }
}
