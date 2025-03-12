import { Injectable } from '@nestjs/common';
import { CreateHomeWorkSubmissionFileDto } from './dto/create-home-work-submission-file.dto';
import { UpdateHomeWorkSubmissionFileDto } from './dto/update-home-work-submission-file.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HomeWorkSubmissionFileService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createHomeWorkSubmissionFileDto: CreateHomeWorkSubmissionFileDto) {
    return this.prismaService.homeWorkSubmissionFile.create({
      data: { ...createHomeWorkSubmissionFileDto },
    });
  }

  async findAll() {
    const homeWorkSubmissionFiles = await this.prismaService.homeWorkSubmissionFile.findMany();
    if (homeWorkSubmissionFiles) {
      return homeWorkSubmissionFiles;
    } else {
      return "Hozircha birorta ham homeWorkSubmissionFile qo'shilmagan";
    }
  }

  async findOne(id: number) {
    const homeWorkSubmissionFile = await this.prismaService.homeWorkSubmissionFile.findUnique({
      where: { id },
    });
    if (homeWorkSubmissionFile) {
      return homeWorkSubmissionFile;
    } else {
      return 'Bunday ID lik homeWorkSubmissionFile topilmadi';
    }
  }

  async update(id: number, updateHomeWorkSubmissionFileDto: UpdateHomeWorkSubmissionFileDto) {
    const homeWorkSubmissionFile = await this.findOne(id);
    if (homeWorkSubmissionFile) {
      return this.prismaService.homeWorkSubmissionFile.update({
        data: updateHomeWorkSubmissionFileDto,
        where: { id },
      });
    } else {
      return 'Bunday ID lik homeWorkSubmissionFile topilmadi';
    }
  }

  async remove(id: number) {
    const homeWorkSubmissionFile = await this.findOne(id);
    if (homeWorkSubmissionFile) {
      return this.prismaService.homeWorkSubmissionFile.delete({ where: { id } });
    } else {
      return 'Bunday ID lik homeWorkSubmissionFile topilmadi';
    }
  }
}
