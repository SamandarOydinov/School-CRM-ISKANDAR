import { Injectable } from '@nestjs/common';
import { CreateExamResultDto } from './dto/create-exam-result.dto';
import { UpdateExamResultDto } from './dto/update-exam-result.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExamResultService {
  constructor(private readonly prismaService: PrismaService) {}
    async create(createExamResultDto: CreateExamResultDto) {
      return this.prismaService.examResult.create({
        data: { ...createExamResultDto },
      });
    }
  
    async findAll() {
      const examResults = await this.prismaService.examResult.findMany();
      if (examResults) {
        return examResults;
      } else {
        return "Hozircha birorta ham examResult qo'shilmagan";
      }
    }
  
    async findOne(id: number) {
      const examResult = await this.prismaService.examResult.findUnique({ where: { id } });
      if (examResult) {
        return examResult;
      } else {
        return 'Bunday ID lik examResult topilmadi';
      }
    }
  
    async update(id: number, updateExamResultDto: UpdateExamResultDto) {
      const examResult = await this.findOne(id);
      if (examResult) {
        return this.prismaService.examResult.update({
          data: updateExamResultDto,
          where: { id },
        });
      } else {
        return 'Bunday ID lik examResult topilmadi';
      }
    }
  
    async remove(id: number) {
      const examResult = await this.findOne(id);
      if (examResult) {
        return this.prismaService.examResult.delete({ where: { id } });
      } else {
        return 'Bunday ID lik examResult topilmadi';
      }
    }
}
