import { Injectable } from '@nestjs/common';
import { CreateChatGroupMemberDto } from './dto/create-chat-group-member.dto';
import { UpdateChatGroupMemberDto } from './dto/update-chat-group-member.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatGroupMemberService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createChatGroupMemberDto: CreateChatGroupMemberDto) {
    return this.prismaService.chatGroupMembers.create({
      data: { ...createChatGroupMemberDto, is_active: false },
    });
  }

  async findAll() {
    const chatGroupMemberss = await this.prismaService.chatGroupMembers.findMany();
    if (chatGroupMemberss) {
      return chatGroupMemberss;
    } else {
      return "Hozircha birorta ham chatGroupMembers qo'shilmagan";
    }
  }

  async findOne(id: number) {
    const chatGroupMembers = await this.prismaService.chatGroupMembers.findUnique({
      where: { id },
    });
    if (chatGroupMembers) {
      return chatGroupMembers;
    } else {
      return 'Bunday ID lik chatGroupMembers topilmadi';
    }
  }

  async update(id: number, updateChatGroupMemberDto: UpdateChatGroupMemberDto) {
    const chatGroupMembers = await this.findOne(id);
    if (chatGroupMembers) {
      return this.prismaService.chatGroupMembers.update({
        data: updateChatGroupMemberDto,
        where: { id },
      });
    } else {
      return 'Bunday ID lik chatGroupMembers topilmadi';
    }
  }

  async remove(id: number) {
    const chatGroupMembers = await this.findOne(id);
    if (chatGroupMembers) {
      return this.prismaService.chatGroupMembers.delete({ where: { id } });
    } else {
      return 'Bunday ID lik chatGroupMembers topilmadi';
    }
  }
}
