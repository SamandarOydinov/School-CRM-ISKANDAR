import { Module } from '@nestjs/common';
import { HomeWorkFileService } from './home-work-file.service';
import { HomeWorkFileController } from './home-work-file.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HomeWorkFileController],
  providers: [HomeWorkFileService],
})
export class HomeWorkFileModule {}
