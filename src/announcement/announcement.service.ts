import { Injectable } from '@nestjs/common';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnnouncementService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createAnnouncementDto: CreateAnnouncementDto) {
    return this.prismaService.announcement.create({
      data: { ...createAnnouncementDto },
    });
  }

  async findAll() {
    const announcements = await this.prismaService.announcement.findMany();
    if (announcements) {
      return announcements;
    } else {
      return "Hozircha birorta ham announcement qo'shilmagan";
    }
  }

  async findOne(id: number) {
    const announcement = await this.prismaService.announcement.findUnique({
      where: { id },
    });
    if (announcement) {
      return announcement;
    } else {
      return 'Bunday ID lik announcement topilmadi';
    }
  }

  async update(id: number, updateAnnouncementDto: UpdateAnnouncementDto) {
    const announcement = await this.findOne(id);
    if (announcement) {
      return this.prismaService.announcement.update({
        data: updateAnnouncementDto,
        where: { id },
      });
    } else {
      return 'Bunday ID lik announcement topilmadi';
    }
  }

  async remove(id: number) {
    const announcement = await this.findOne(id);
    if (announcement) {
      return this.prismaService.announcement.delete({ where: { id } });
    } else {
      return 'Bunday ID lik announcement topilmadi';
    }
  }
}
