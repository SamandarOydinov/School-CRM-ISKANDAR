import { Injectable } from '@nestjs/common';
import { CreateScienceDto } from './dto/create-science.dto';
import { UpdateScienceDto } from './dto/update-science.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ScienceService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createScienceDto: CreateScienceDto) {
    return this.prismaService.science.create({
      data: { ...createScienceDto },
    });
  }

  async findAll() {
    const sciences = await this.prismaService.science.findMany();
    if (sciences) {
      return sciences;
    } else {
      return "Hozircha birorta ham science qo'shilmagan";
    }
  }

  async findOne(id: number) {
    const science = await this.prismaService.science.findUnique({
      where: { id },
    });
    if (science) {
      return science;
    } else {
      return 'Bunday ID lik science topilmadi';
    }
  }

  async update(id: number, updateScienceDto: UpdateScienceDto) {
    const science = await this.findOne(id);
    if (science) {
      return this.prismaService.science.update({
        data: updateScienceDto,
        where: { id },
      });
    } else {
      return 'Bunday ID lik science topilmadi';
    }
  }

  async remove(id: number) {
    const science = await this.findOne(id);
    if (science) {
      return this.prismaService.science.delete({ where: { id } });
    } else {
      return 'Bunday ID lik science topilmadi';
    }
  }
}
