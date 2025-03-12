import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createMessageDto: CreateMessageDto) {
    return this.prismaService.messages.create({
      data: { ...createMessageDto },
    });
  }

  async findAll() {
    const messagess = await this.prismaService.messages.findMany();
    if (messagess) {
      return messagess;
    } else {
      return "Hozircha birorta ham messages qo'shilmagan";
    }
  }

  async findOne(id: number) {
    const messages = await this.prismaService.messages.findUnique({
      where: { id },
    });
    if (messages) {
      return messages;
    } else {
      return 'Bunday ID lik messages topilmadi';
    }
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    const messages = await this.findOne(id);
    if (messages) {
      return this.prismaService.messages.update({
        data: updateMessageDto,
        where: { id },
      });
    } else {
      return 'Bunday ID lik messages topilmadi';
    }
  }

  async remove(id: number) {
    const messages = await this.findOne(id);
    if (messages) {
      return this.prismaService.messages.delete({ where: { id } });
    } else {
      return 'Bunday ID lik messages topilmadi';
    }
  }
}
