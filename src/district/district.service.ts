import { Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DistrictService {
  constructor(private readonly prismaService: PrismaService) {}
    async create(createDistrictDto: CreateDistrictDto) {
      return this.prismaService.district.create({
        data: { ...createDistrictDto },
      });
    }
  
    async findAll() {
      const districts = await this.prismaService.district.findMany();
      if (districts) {
        return districts;
      } else {
        return "Hozircha birorta ham district qo'shilmagan";
      }
    }
  
    async findOne(id: number) {
      const district = await this.prismaService.district.findUnique({ where: { id } });
      if (district) {
        return district;
      } else {
        return 'Bunday ID lik district topilmadi';
      }
    }
  
    async update(id: number, updateDistrictDto: UpdateDistrictDto) {
      const district = await this.findOne(id);
      if (district) {
        return this.prismaService.district.update({
          data: updateDistrictDto,
          where: { id },
        });
      } else {
        return 'Bunday ID lik district topilmadi';
      }
    }
  
    async remove(id: number) {
      const district = await this.findOne(id);
      if (district) {
        return this.prismaService.district.delete({ where: { id } });
      } else {
        return 'Bunday ID lik district topilmadi';
      }
    }
}
