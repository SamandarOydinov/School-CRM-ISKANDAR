import { Module } from '@nestjs/common';
import { HomeWorkSubmissionFileService } from './home-work-submission-file.service';
import { HomeWorkSubmissionFileController } from './home-work-submission-file.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HomeWorkSubmissionFileController],
  providers: [HomeWorkSubmissionFileService],
})
export class HomeWorkSubmissionFileModule {}
