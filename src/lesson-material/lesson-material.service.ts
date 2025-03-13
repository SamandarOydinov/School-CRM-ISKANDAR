import { Injectable } from '@nestjs/common';
import { CreateLessonMaterialDto } from './dto/create-lesson-material.dto';
import { UpdateLessonMaterialDto } from './dto/update-lesson-material.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FileService } from '../file/file.service';
import { LessonService } from '../lesson/lesson.service';

@Injectable()
export class LessonMaterialService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly fileService: FileService,
    private readonly lessonService: LessonService,
  ) {}
  async create(data: CreateLessonMaterialDto, file: any) {
    const fileName = await this.fileService.saveFile(file);
    const createdFile = await this.fileService.create({
      name: data.file_name,
      url: fileName,
    });
    const lesson = await this.lessonService.findOneForLessonMaterial(
      data.lessonId,
    );
    if (lesson) {
      return this.prismaService.lessonMaterials.create({
        data: {
          ...data,
          fileId: createdFile.id,
          topic_name: lesson.title,
          uploaded_at: new Date(),
          lessonId: Number(data.lessonId),
        },
      });
    } else {
      return `File yuklab bo'lmadi`;
    }
  }

  async findAll() {
    const lessonMaterialss =
      await this.prismaService.lessonMaterials.findMany();
    if (lessonMaterialss) {
      return lessonMaterialss;
    } else {
      return "Hozircha birorta ham lessonMaterials qo'shilmagan";
    }
  }

  async findOne(id: number) {
    const lessonMaterials = await this.prismaService.lessonMaterials.findUnique(
      {
        where: { id },
      },
    );
    if (lessonMaterials) {
      return lessonMaterials;
    } else {
      return 'Bunday ID lik lessonMaterials topilmadi';
    }
  }

  async update(id: number, updateLessonMaterialDto: UpdateLessonMaterialDto) {
    const lessonMaterials = await this.findOne(id);
    if (lessonMaterials) {
      return this.prismaService.lessonMaterials.update({
        data: updateLessonMaterialDto,
        where: { id },
      });
    } else {
      return 'Bunday ID lik lessonMaterials topilmadi';
    }
  }

  async remove(id: number) {
    const lessonMaterials = await this.findOne(id);
    if (lessonMaterials) {
      return this.prismaService.lessonMaterials.delete({ where: { id } });
    } else {
      return 'Bunday ID lik lessonMaterials topilmadi';
    }
  }
}
