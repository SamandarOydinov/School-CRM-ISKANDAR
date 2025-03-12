import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private readonly prismaService: PrismaService) {}
    async create(createRoleDto: CreateRoleDto) {
      return this.prismaService.role.create({
        data: { ...createRoleDto },
      });
    }
  
    async findAll() {
      const roles = await this.prismaService.role.findMany();
      if (roles) {
        return roles;
      } else {
        return "Hozircha birorta ham role qo'shilmagan";
      }
    }
  
    async findOne(id: number) {
      const role = await this.prismaService.role.findUnique({
        where: { id },
      });
      return role
    }
  
    async update(id: number, updateRoleDto: UpdateRoleDto) {
      const role = await this.findOne(id);
      if (role) {
        return this.prismaService.role.update({
          data: updateRoleDto,
          where: { id },
        });
      } else {
        return 'Bunday ID lik role topilmadi';
      }
    }
  
    async remove(id: number) {
      const role = await this.findOne(id);
      if (role) {
        return this.prismaService.role.delete({ where: { id } });
      } else {
        return 'Bunday ID lik role topilmadi';
      }
    }
}
