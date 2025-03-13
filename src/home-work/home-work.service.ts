import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateHomeWorkDto } from './dto/create-home-work.dto';
import { UpdateHomeWorkDto } from './dto/update-home-work.dto';
import { PrismaService } from '../prisma/prisma.service';
import { LessonService } from '../lesson/lesson.service';
import { UsersService } from '../users/users.service';
import { ClassService } from '../class/class.service';

@Injectable()
export class HomeWorkService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly lessonService: LessonService,
    private readonly usersService: UsersService,
    private readonly classService: ClassService,
  ) {}
  async create(createHomeWorkDto: CreateHomeWorkDto, id: number) {
    const teacher = await this.usersService.findOne(id);
    if (!teacher.data.is_active) {
      throw new BadRequestException('Siz active emassiz');
    }
    const lesson = await this.lessonService.findOne(createHomeWorkDto.lessonId);
    console.log('lesson: ', lesson);
    if (!lesson) {
      throw new BadRequestException('Bunday ID lik dars mavjud emas');
    }
    return this.prismaService.homeWork.create({
      data: {
        ...createHomeWorkDto,
        start_date: new Date(createHomeWorkDto.start_date),
        end_date: new Date(createHomeWorkDto.end_date),
      },
    });
  }

  async findAll(id: number) {
    const teacher = await this.usersService.findOne(id);
    if (!teacher.data.is_active) {
      throw new BadRequestException('Siz active emassiz');
    }
    const homeWorks = await this.prismaService.homeWork.findMany({
      include: { Lesson: { select: { groupId: true } } },
    });
    if (homeWorks) {
      return homeWorks;
    } else {
      return "Hozircha birorta ham homeWork qo'shilmagan";
    }
  }

  async findManyByUserId(id: number) {
    const user = await this.usersService.findOne(id);
    console.log('user: ', user);
    if (!user.data.classId) {
      throw new BadRequestException('user not found');
    }
    const clas = await this.classService.findOne(user.data.classId);

    if (!clas.status) {
      throw new BadRequestException({ message: clas.message });
    }
    const lesson = await this.lessonService.findByClassId(clas.data!.id);

    if (!lesson.status) {
      throw new BadRequestException({ message: lesson.message });
    }

    console.log('lessons: ', lesson);
    const homeWork = await this.prismaService.homeWork.findMany({
      where: { lessonId: lesson.data!.id },
    });
    return homeWork;

    // const clas = this.prismaService.homeWork.findMany({where: {}})
  }

  async findOne(id: number) {
    const homeWork = await this.prismaService.homeWork.findMany({
      where: { id },
      include: { Lesson: { select: { groupId: true } } },
    });
    if (homeWork) {
      return homeWork;
    } else {
      return 'Bunday ID lik homeWork topilmadi';
    }
  }

  async update(id: number, updateHomeWorkDto: UpdateHomeWorkDto) {
    const homeWork = await this.findOne(id);
    if (homeWork) {
      return this.prismaService.homeWork.update({
        data: updateHomeWorkDto,
        where: { id },
      });
    } else {
      return 'Bunday ID lik homeWork topilmadi';
    }
  }

  async remove(id: number) {
    const homeWork = await this.findOne(id);
    if (homeWork) {
      return this.prismaService.homeWork.delete({ where: { id } });
    } else {
      return 'Bunday ID lik homeWork topilmadi';
    }
  }
}
