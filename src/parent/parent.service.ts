import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ParentService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createParentDto: CreateParentDto) {
    const { password, confirm_password, ...data } = createParentDto;
    if (password !== confirm_password) {
      throw new BadRequestException('Parollar mos emas');
    }

    const hashedPassword = await bcrypt.hash(password, 7);
    const parent = await this.prismaService.parent.create({
      data: {
        ...data,
        hashedPassword: hashedPassword,
        hashedRefreshToken: '',
      },
    });

    return parent;
  }

  async findAll() {
    const parents = await this.prismaService.parent.findMany();
    if (parents) {
      return parents;
    } else {
      return "Hozircha birorta ham parent qo'shilmagan";
    }
  }

  async findOne(id: number) {
    const parent = await this.prismaService.parent.findUnique({
      where: { id },
    });
    if (parent) {
      return parent;
    } else {
      return 'Bunday ID lik parent topilmadi';
    }
  }

  async update(id: number, updateParentDto: UpdateParentDto) {
    const parent = await this.findOne(id);
    if (parent) {
      return this.prismaService.parent.update({
        data: updateParentDto,
        where: { id },
      });
    } else {
      return 'Bunday ID lik parent topilmadi';
    }
  }

  async remove(id: number) {
    const parent = await this.findOne(id);
    if (parent) {
      return this.prismaService.parent.delete({ where: { id } });
    } else {
      return 'Bunday ID lik parent topilmadi';
    }
  }
}
