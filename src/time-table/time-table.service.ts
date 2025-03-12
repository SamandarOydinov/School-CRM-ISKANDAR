import { Injectable } from '@nestjs/common';
import { CreateTimeTableDto } from './dto/create-time-table.dto';
import { UpdateTimeTableDto } from './dto/update-time-table.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TimeTableService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createTimeTableDto: CreateTimeTableDto) {
    return this.prismaService.timeTable.create({
      data: { ...createTimeTableDto },
    });
  }

  async findAll() {
    const timeTables = await this.prismaService.timeTable.findMany();
    if (timeTables) {
      return timeTables;
    } else {
      return "Hozircha birorta ham timeTable qo'shilmagan";
    }
  }

  async findOne(id: number) {
    const timeTable = await this.prismaService.timeTable.findUnique({
      where: { id },
    });
    if (timeTable) {
      return timeTable;
    } else {
      return 'Bunday ID lik timeTable topilmadi';
    }
  }

  async update(id: number, updateTimeTableDto: UpdateTimeTableDto) {
    const timeTable = await this.findOne(id);
    if (timeTable) {
      return this.prismaService.timeTable.update({
        data: updateTimeTableDto,
        where: { id },
      });
    } else {
      return 'Bunday ID lik timeTable topilmadi';
    }
  }

  async remove(id: number) {
    const timeTable = await this.findOne(id);
    if (timeTable) {
      return this.prismaService.timeTable.delete({ where: { id } });
    } else {
      return 'Bunday ID lik timeTable topilmadi';
    }
  }
}
