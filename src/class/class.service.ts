import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClassService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createClassDto: CreateClassDto) {
    return this.prismaService.class.create({
      data: {
        ...createClassDto,
        is_active: false,
        lessonStartDate: new Date(createClassDto.lessonStartDate),
        lessonEndDate: new Date(createClassDto.lessonEndDate),
      },
    });
  }

  async findAll() {
    const classes = await this.prismaService.class.findMany();
    if (classes) {
      return classes;
    } else {
      return "Hozircha birorta ham class qo'shilmagan";
    }
  }

  async findOne(id: number) {
    const clas = await this.prismaService.class.findUnique({ where: { id } });
    if (clas) {
      return {data: clas, status: true}
    } else {
      return {
        message: "Bunday class yo'q",
        status: false
      }
    }
  }

  async update(id: number, updateClassDto: UpdateClassDto) {
    const clas = await this.findOne(id);
    if (clas) {
      return this.prismaService.class.update({
        data: updateClassDto,
        where: { id },
      });
    } else {
      return 'Bunday ID lik class topilmadi';
    }
  }

  async remove(id: number) {
    const clas = await this.findOne(id);
    if (clas) {
      return this.prismaService.class.delete({ where: { id } });
    } else {
      return 'Bunday ID lik class topilmadi';
    }
  }
}
