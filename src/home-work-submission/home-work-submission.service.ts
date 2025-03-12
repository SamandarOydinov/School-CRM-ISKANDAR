import { Injectable } from '@nestjs/common';
import { CreateHomeWorkSubmissionDto } from './dto/create-home-work-submission.dto';
import { UpdateHomeWorkSubmissionDto } from './dto/update-home-work-submission.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HomeWorkSubmissionService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createHomeWorkSubmissionDto: CreateHomeWorkSubmissionDto) {
    return this.prismaService.homeWorkSubmissions.create({
      data: { ...createHomeWorkSubmissionDto },
    });
  }

  async findAll() {
    const homeWorkSubmissionss = await this.prismaService.homeWorkSubmissions.findMany();
    if (homeWorkSubmissionss) {
      return homeWorkSubmissionss;
    } else {
      return "Hozircha birorta ham homeWorkSubmissions qo'shilmagan";
    }
  }

  async findOne(id: number) {
    const homeWorkSubmissions = await this.prismaService.homeWorkSubmissions.findUnique({
      where: { id },
    });
    if (homeWorkSubmissions) {
      return homeWorkSubmissions;
    } else {
      return 'Bunday ID lik homeWorkSubmissions topilmadi';
    }
  }

  async update(id: number, updateHomeWorkSubmissionDto: UpdateHomeWorkSubmissionDto) {
    const homeWorkSubmissions = await this.findOne(id);
    if (homeWorkSubmissions) {
      return this.prismaService.homeWorkSubmissions.update({
        data: updateHomeWorkSubmissionDto,
        where: { id },
      });
    } else {
      return 'Bunday ID lik homeWorkSubmissions topilmadi';
    }
  }

  async remove(id: number) {
    const homeWorkSubmissions = await this.findOne(id);
    if (homeWorkSubmissions) {
      return this.prismaService.homeWorkSubmissions.delete({ where: { id } });
    } else {
      return 'Bunday ID lik homeWorkSubmissions topilmadi';
    }
  }
}
