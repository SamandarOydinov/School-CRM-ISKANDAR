import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AttendanceService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createAttendanceDto: CreateAttendanceDto) {
    return this.prismaService.attendance.create({
      data: { ...createAttendanceDto },
    });
  }

  async findAll() {
    const attendances = await this.prismaService.attendance.findMany();
    if (attendances) {
      return attendances;
    } else {
      return "Hozircha birorta ham attendance qo'shilmagan";
    }
  }

  async findOne(id: number) {
    const attendance = await this.prismaService.attendance.findUnique({
      where: { id },
    });
    if (attendance) {
      return attendance;
    } else {
      return 'Bunday ID lik attendance topilmadi';
    }
  }

  async update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    const attendance = await this.findOne(id);
    if (attendance) {
      return this.prismaService.attendance.update({
        data: updateAttendanceDto,
        where: { id },
      });
    } else {
      return 'Bunday ID lik attendance topilmadi';
    }
  }

  async remove(id: number) {
    const attendance = await this.findOne(id);
    if (attendance) {
      return this.prismaService.attendance.delete({ where: { id } });
    } else {
      return 'Bunday ID lik attendance topilmadi';
    }
  }
}
