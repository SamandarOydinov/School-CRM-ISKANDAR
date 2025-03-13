import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ClassService } from '../class/class.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class LessonService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
    private readonly classService: ClassService,
  ) {}
  async create(createLessonDto: CreateLessonDto, id: number) {
    const teacher = await this.usersService.findOne(id);
    if (!teacher.data.is_active) {
      throw new BadRequestException('Siz active emassiz');
    }
    return this.prismaService.lesson.create({
      data: {
        ...createLessonDto,
        teacherId: Number(id),
        is_exam: false,
        starts: new Date(createLessonDto.starts),
        finishes: new Date(createLessonDto.finishes),
      },
    });
  }

  async findAll() {
    const lessons = await this.prismaService.lesson.findMany({
      include: {
        homeWork: {
          select: { description: true, start_date: true, end_date: true },
        },
      },
    });
    if (lessons) {
      return lessons;
    } else {
      throw new BadRequestException("Hozircha birorta ham lesson qo'shilmagan");
    }
  }

  async findOne(id: number) {
    const lesson = await this.prismaService.lesson.findUnique({
      where: { id },
    });
    if (lesson) {
      return lesson;
    } else {
      throw new BadRequestException('bunday ID lik lesson topilmadi');
    }
  }

  async findByClassId(id: number) {
    const lesson = await this.prismaService.lesson.findFirst({
      where: { groupId: id },
    });
    if (lesson) return { data: lesson, status: true };
    return {
      message: 'Bunday lesson mavjud emas',
      status: false,
    };
  }

  async findOneForLessonMaterial(id: number) {
    const lesson = await this.prismaService.lesson.findFirst({
      where: { groupId: Number(id) },
    });
    if (lesson) {
      return lesson;
    } else {
      return false;
    }
  }

  async update(id: number, updateLessonDto: UpdateLessonDto) {
    const lesson = await this.findOne(id);
    if (lesson) {
      return this.prismaService.lesson.update({
        data: updateLessonDto,
        where: { id },
      });
    } else {
      return 'Bunday ID lik lesson topilmadi';
    }
  }

  async remove(id: number) {
    const lesson = await this.findOne(id);
    if (lesson) {
      return this.prismaService.lesson.delete({ where: { id } });
    } else {
      return 'Bunday ID lik lesson topilmadi';
    }
  }
}
