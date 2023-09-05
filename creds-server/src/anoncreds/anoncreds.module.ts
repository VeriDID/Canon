import { Module } from '@nestjs/common';
import { AnoncredsController } from './anoncreds.controller';
import { AnoncredsService } from './anoncreds.service';

@Module({
  controllers: [AnoncredsController],
  providers: [AnoncredsService]
})
export class AnoncredsModule {}
