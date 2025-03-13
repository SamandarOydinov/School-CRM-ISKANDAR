import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ClassModule } from '../class/class.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PrismaModule, ClassModule, UsersModule],
  controllers: [LessonController],
  providers: [LessonService],
  exports: [LessonService],
})
export class LessonModule {}
