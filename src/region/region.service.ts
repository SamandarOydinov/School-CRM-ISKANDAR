import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RegionService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createRegionDto: CreateRegionDto) {
    return this.prismaService.region.create({ data: createRegionDto });
  }

  async findAll() {
    const regions = await this.prismaService.region.findMany();
    if(regions){
      return regions
    } else {
      return "Hozircha birorta ham region qo'shilmagan"
    }
  }

  async findOne(id: number) {
    const region = await this.prismaService.region.findUnique({ where: { id } });
    if (region) {
      return region;
    } else {
      return "Bunday ID lik region topilmadi";
    }
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    const region = await this.findOne(id)
    if (region) {
      return this.prismaService.region.update({
        data: updateRegionDto,
        where: { id },
      });
    } else {
      return "Bunday ID lik region topilmadi";
    }
  }

  async remove(id: number) {
    const region = await this.findOne(id);
    if (region) {
      return this.prismaService.region.delete({ where: { id } });
    } else {
      return 'Bunday ID lik region topilmadi';
    }
  }
}
