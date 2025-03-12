import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CourseService {
  constructor(private readonly prismaService: PrismaService) {}
      async create(createCourseDto: CreateCourseDto) {
        return this.prismaService.course.create({ data: createCourseDto });
      }
    
      async findAll() {
        const classes = await this.prismaService.course.findMany();
        if(classes){
          return classes
        } else {
          return "Hozircha birorta ham course qo'shilmagan"
        }
      }
    
      async findOne(id: number) {
        const clas = await this.prismaService.course.findUnique({ where: { id } });
        if (clas) {
          return clas
        } else {
          return "Bunday ID lik course topilmadi";
        }
      }
    
      async update(id: number, updateCourseDto: UpdateCourseDto) {
        const clas = await this.findOne(id)
        if (clas) {
          return this.prismaService.course.update({
            data: updateCourseDto,
            where: { id },
          });
        } else {
          return "Bunday ID lik course topilmadi";
        }
      }
    
      async remove(id: number) {
        const clas = await this.findOne(id);
        if (clas) {
          return this.prismaService.course.delete({ where: { id } });
        } else {
          return 'Bunday ID lik course topilmadi';
        }
      }
}
