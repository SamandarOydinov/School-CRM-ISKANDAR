import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as uuid from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createFileDto: CreateFileDto) {
    return this.prismaService.file.create({
      data: { ...createFileDto },
    });
  }

  async findAll() {
    const files = await this.prismaService.file.findMany({
      select: { id: true, name: true },
    });
    if (files) {
      return files;
    } else {
      return "Hozircha birorta ham file qo'shilmagan";
    }
  }

  async saveFile(file: any): Promise<string> {
    try {
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve(__dirname, '..', '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (error) {
      throw new InternalServerErrorException('Filega yozishda xatolik!');
    }
  }

  async findOne(id: number) {
    const file = await this.prismaService.file.findUnique({
      where: { id },
      select: { id: true, name: true },
    });
    if (file) {
      return file;
    } else {
      return 'Bunday ID lik file topilmadi';
    }
  }

  async update(id: number, updateFileDto: UpdateFileDto) {
    const file = await this.findOne(id);
    if (file) {
      return this.prismaService.file.update({
        data: updateFileDto,
        where: { id },
      });
    } else {
      return 'Bunday ID lik file topilmadi';
    }
  }

  async remove(id: number) {
    const file = await this.findOne(id);
    if (file) {
      return this.prismaService.file.delete({ where: { id } });
    } else {
      return 'Bunday ID lik file topilmadi';
    }
  }
}
