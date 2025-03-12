import { Injectable } from '@nestjs/common';
import { CreatePupilParentDto } from './dto/create-pupil-parent.dto';
import { UpdatePupilParentDto } from './dto/update-pupil-parent.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PupilParentService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createPupilParentDto: CreatePupilParentDto) {
    return this.prismaService.pupilParent.create({
      data: { ...createPupilParentDto },
    });
  }

  async findAll() {
    const pupilParents = await this.prismaService.pupilParent.findMany();
    if (pupilParents) {
      return pupilParents;
    } else {
      return "Hozircha birorta ham pupilParent qo'shilmagan";
    }
  }

  async findOne(id: number) {
    const pupilParent = await this.prismaService.pupilParent.findUnique({
      where: { id },
    });
    if (pupilParent) {
      return pupilParent;
    } else {
      return 'Bunday ID lik pupilParent topilmadi';
    }
  }

  async update(id: number, updatePupilParentDto: UpdatePupilParentDto) {
    const pupilParent = await this.findOne(id);
    if (pupilParent) {
      return this.prismaService.pupilParent.update({
        data: updatePupilParentDto,
        where: { id },
      });
    } else {
      return 'Bunday ID lik pupilParent topilmadi';
    }
  }

  async remove(id: number) {
    const pupilParent = await this.findOne(id);
    if (pupilParent) {
      return this.prismaService.pupilParent.delete({ where: { id } });
    } else {
      return 'Bunday ID lik pupilParent topilmadi';
    }
  }
}
