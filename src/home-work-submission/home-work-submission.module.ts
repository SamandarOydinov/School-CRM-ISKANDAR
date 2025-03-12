import { Module } from '@nestjs/common';
import { HomeWorkSubmissionService } from './home-work-submission.service';
import { HomeWorkSubmissionController } from './home-work-submission.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HomeWorkSubmissionController],
  providers: [HomeWorkSubmissionService],
})
export class HomeWorkSubmissionModule {}
