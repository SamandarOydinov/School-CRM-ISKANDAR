import { Module } from '@nestjs/common';
import { ScienceService } from './science.service';
import { ScienceController } from './science.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ScienceController],
  providers: [ScienceService],
})
export class ScienceModule {}
