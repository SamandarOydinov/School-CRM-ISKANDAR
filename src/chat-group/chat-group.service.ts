import { Injectable } from '@nestjs/common';
import { CreateChatGroupDto } from './dto/create-chat-group.dto';
import { UpdateChatGroupDto } from './dto/update-chat-group.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatGroupService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createChatGroupDto: CreateChatGroupDto) {
    return this.prismaService.chatGroup.create({
      data: { ...createChatGroupDto },
    });
  }

  async findAll() {
    const chatGroups = await this.prismaService.chatGroup.findMany();
    if (chatGroups) {
      return chatGroups;
    } else {
      return "Hozircha birorta ham chatGroup qo'shilmagan";
    }
  }

  async findOne(id: number) {
    const chatGroup = await this.prismaService.chatGroup.findUnique({
      where: { id },
    });
    if (chatGroup) {
      return chatGroup;
    } else {
      return 'Bunday ID lik chatGroup topilmadi';
    }
  }

  async update(id: number, updateChatGroupDto: UpdateChatGroupDto) {
    const chatGroup = await this.findOne(id);
    if (chatGroup) {
      return this.prismaService.chatGroup.update({
        data: updateChatGroupDto,
        where: { id },
      });
    } else {
      return 'Bunday ID lik chatGroup topilmadi';
    }
  }

  async remove(id: number) {
    const chatGroup = await this.findOne(id);
    if (chatGroup) {
      return this.prismaService.chatGroup.delete({ where: { id } });
    } else {
      return 'Bunday ID lik chatGroup topilmadi';
    }
  }
}
