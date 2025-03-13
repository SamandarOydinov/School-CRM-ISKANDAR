import { Injectable } from '@nestjs/common';
import { CreateHomeWorkFileDto } from './dto/create-home-work-file.dto';
import { UpdateHomeWorkFileDto } from './dto/update-home-work-file.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HomeWorkFileService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createHomeWorkFileDto: CreateHomeWorkFileDto) {
    return this.prismaService.homeWorkFile.create({
      data: { ...createHomeWorkFileDto },
    });
  }

  async findAll() {
    const homeWorkFiles = await this.prismaService.homeWorkFile.findMany({
      include: {
        HomeWork: {
          select: {
            end_date: true,
            homeWorkFile: { select: { File: { select: { url: true } } } },
          },
        },
      },
    });
    if (homeWorkFiles) {
      return homeWorkFiles;
    } else {
      return "Hozircha birorta ham homeWorkFile qo'shilmagan";
    }
  }

  async findOne(id: number) {
    const homeWorkFile = await this.prismaService.homeWorkFile.findUnique({
      where: { id },
    });
    if (homeWorkFile) {
      return homeWorkFile;
    } else {
      return 'Bunday ID lik homeWorkFile topilmadi';
    }
  }

  async update(id: number, updateHomeWorkFileDto: UpdateHomeWorkFileDto) {
    const homeWorkFile = await this.findOne(id);
    if (homeWorkFile) {
      return this.prismaService.homeWorkFile.update({
        data: updateHomeWorkFileDto,
        where: { id },
      });
    } else {
      return 'Bunday ID lik homeWorkFile topilmadi';
    }
  }

  async remove(id: number) {
    const homeWorkFile = await this.findOne(id);
    if (homeWorkFile) {
      return this.prismaService.homeWorkFile.delete({ where: { id } });
    } else {
      return 'Bunday ID lik homeWorkFile topilmadi';
    }
  }
}
