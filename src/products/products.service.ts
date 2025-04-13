import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return this.prismaService.products.create({ data: createProductDto });
  }

  async findAll() {
    const regions = await this.prismaService.products.findMany();
    if (regions) {
      return regions;
    } else {
      return "Hozircha birorta ham product qo'shilmagan";
    }
  }

  async findOne(id: number) {
    const product = await this.prismaService.products.findFirst({
      where: { id },
    });
    if (product) {
      return product;
    } else {
      return 'Bunday ID lik product topilmadi';
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    if (product) {
      return this.prismaService.products.update({
        data: updateProductDto,
        where: { id },
      });
    } else {
      return 'Bunday ID lik product topilmadi';
    }
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    if (product) {
      return this.prismaService.products.delete({ where: { id } });
    } else {
      return 'Bunday ID lik product topilmadi';
    }
  }
}
