import { Module } from '@nestjs/common';
import { HomeWorkService } from './home-work.service';
import { HomeWorkController } from './home-work.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { LessonService } from '../lesson/lesson.service';
import { UsersModule } from '../users/users.module';
import { LessonModule } from '../lesson/lesson.module';
import { ClassModule } from '../class/class.module';

@Module({
  imports: [PrismaModule, UsersModule, LessonModule, ClassModule],
  controllers: [HomeWorkController],
  providers: [HomeWorkService],
})
export class HomeWorkModule {}
