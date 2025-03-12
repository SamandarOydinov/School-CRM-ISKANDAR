import { Injectable } from '@nestjs/common';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SchoolService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createSchoolDto: CreateSchoolDto) {
    return this.prismaService.school.create({
      data: { ...createSchoolDto },
    });
  }

  async findAll() {
    const schools = await this.prismaService.school.findMany();
    if (schools) {
      return schools;
    } else {
      return "Hozircha birorta ham school qo'shilmagan";
    }
  }

  async findOne(id: number) {
    const school = await this.prismaService.school.findUnique({ where: { id } });
    if (school) {
      return school;
    } else {
      return 'Bunday ID lik school topilmadi';
    }
  }

  async update(id: number, updateSchoolDto: UpdateSchoolDto) {
    const school = await this.findOne(id);
    if (school) {
      return this.prismaService.school.update({
        data: updateSchoolDto,
        where: { id },
      });
    } else {
      return 'Bunday ID lik school topilmadi';
    }
  }

  async remove(id: number) {
    const school = await this.findOne(id);
    if (school) {
      return this.prismaService.school.delete({ where: { id } });
    } else {
      return 'Bunday ID lik school topilmadi';
    }
  }
}