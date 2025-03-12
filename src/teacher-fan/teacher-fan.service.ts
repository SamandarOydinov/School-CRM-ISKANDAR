import { Injectable } from '@nestjs/common';
import { CreateTeacherFanDto } from './dto/create-teacher-fan.dto';
import { UpdateTeacherFanDto } from './dto/update-teacher-fan.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeacherFanService {
  constructor(private readonly prismaService: PrismaService) {}
    async create(createTeacherFanDto: CreateTeacherFanDto) {
      return this.prismaService.teacherFan.create({
        data: { ...createTeacherFanDto },
      });
    }
  
    async findAll() {
      const teacherFans = await this.prismaService.teacherFan.findMany();
      if (teacherFans) {
        return teacherFans;
      } else {
        return "Hozircha birorta ham teacherFan qo'shilmagan";
      }
    }
  
    async findOne(id: number) {
      const teacherFan = await this.prismaService.teacherFan.findUnique({ where: { id } });
      if (teacherFan) {
        return teacherFan;
      } else {
        return 'Bunday ID lik teacherFan topilmadi';
      }
    }
  
    async update(id: number, updateTeacherFanDto: UpdateTeacherFanDto) {
      const teacherFan = await this.findOne(id);
      if (teacherFan) {
        return this.prismaService.teacherFan.update({
          data: updateTeacherFanDto,
          where: { id },
        });
      } else {
        return 'Bunday ID lik teacherFan topilmadi';
      }
    }
  
    async remove(id: number) {
      const teacherFan = await this.findOne(id);
      if (teacherFan) {
        return this.prismaService.teacherFan.delete({ where: { id } });
      } else {
        return 'Bunday ID lik teacherFan topilmadi';
      }
    }
}
