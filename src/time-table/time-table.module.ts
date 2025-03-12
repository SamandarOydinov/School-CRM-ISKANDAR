import { Module } from '@nestjs/common';
import { TimeTableService } from './time-table.service';
import { TimeTableController } from './time-table.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TimeTableController],
  providers: [TimeTableService],
})
export class TimeTableModule {}
