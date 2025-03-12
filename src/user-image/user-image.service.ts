import { Injectable } from '@nestjs/common';
import { CreateUserImageDto } from './dto/create-user-image.dto';
import { UpdateUserImageDto } from './dto/update-user-image.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserImageService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUserImageDto: CreateUserImageDto) {
    return this.prismaService.userImage.create({
      data: { ...createUserImageDto },
    });
  }

  async findAll() {
    const userImages = await this.prismaService.userImage.findMany();
    if (userImages) {
      return userImages;
    } else {
      return "Hozircha birorta ham userImage qo'shilmagan";
    }
  }

  async findOne(id: number) {
    const userImage = await this.prismaService.userImage.findUnique({
      where: { id },
    });
    if (userImage) {
      return userImage;
    } else {
      return 'Bunday ID lik userImage topilmadi';
    }
  }

  async update(id: number, updateUserImageDto: UpdateUserImageDto) {
    const userImage = await this.findOne(id);
    if (userImage) {
      return this.prismaService.userImage.update({
        data: updateUserImageDto,
        where: { id },
      });
    } else {
      return 'Bunday ID lik userImage topilmadi';
    }
  }

  async remove(id: number) {
    const userImage = await this.findOne(id);
    if (userImage) {
      return this.prismaService.userImage.delete({ where: { id } });
    } else {
      return 'Bunday ID lik userImage topilmadi';
    }
  }
}
