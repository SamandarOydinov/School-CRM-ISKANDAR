import { Module } from '@nestjs/common';
import { TeacherFanService } from './teacher-fan.service';
import { TeacherFanController } from './teacher-fan.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TeacherFanController],
  providers: [TeacherFanService],
})
export class TeacherFanModule {}
