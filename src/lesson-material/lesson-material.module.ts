import { Module } from '@nestjs/common';
import { LessonMaterialService } from './lesson-material.service';
import { LessonMaterialController } from './lesson-material.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { FileService } from '../file/file.service';
import { LessonService } from '../lesson/lesson.service';
import { FileModule } from '../file/file.module';
import { LessonModule } from '../lesson/lesson.module';

@Module({
  imports: [PrismaModule, FileModule, LessonModule],
  controllers: [LessonMaterialController],
  providers: [LessonMaterialService],
})
export class LessonMaterialModule {}
