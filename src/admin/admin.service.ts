import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RolesService } from '../roles/roles.service';
import { CreateRoleDto } from '../roles/dto/create-role.dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UsersService,
    private readonly roleService: RolesService,
  ) {}
  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password, ...data } = createAdminDto;
    if (password !== confirm_password) {
      throw new BadRequestException('Parollar mos kelmadi');
    }
    const hashedPassword = await bcrypt.hash(password, 7);

    const admin = await this.prismaService.admin.create({
      data: { ...data, hashedPassword: hashedPassword, role: ['ADMIN'] },
    });

    return admin;
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string | null) {
    const updatedAdmin = await this.prismaService.admin.update({
      data: { hashedRefreshToken: hashed_refresh_token || '' },
      where: { id },
    });
    return updatedAdmin;
  }

  async findOneByEmail(email: string) {
    return this.prismaService.admin.findUnique({ where: { email } });
  }

  findAll() {
    return this.prismaService.admin.findMany();
  }

  findOne(id: number) {
    return this.prismaService.admin.findUnique({ where: { id } });
  }

  async updateUserRole(userId: number, roleId: number) {
    const role = await this.roleService.findOne(roleId);
    if (!role) {
      return `Bunday role mavjud emas`;
    }

    const user = await this.userService.findOne(userId);
    if (!user) {
      return `Bunday user mavjud emas`;
    }
    const userRole = await this.prismaService.userRole.create({
      data: { userId: userId, roleId: roleId },
    });
    const updatedUser = await this.userService.update(userId, {
      role: [`${role?.name}`],
    });
    return updatedUser;
  }

  async addRole(name: CreateRoleDto) {
    const role = await this.roleService.create(name);
    return {
      message: 'add role successfully',
      data: role,
    };
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return this.prismaService.admin.update({
      where: { id },
      data: { ...updateAdminDto },
    });
  }

  remove(id: number) {
    return this.prismaService.admin.delete({ where: { id } });
  }

  async updateCreatorOfAdmin(id: number) {
    let admin = await this.findOne(id);
    if (admin?.is_creator) {
      admin = await this.prismaService.admin.update({
        where: { id },
        data: { is_creator: false },
      });
    } else {
      admin = await this.prismaService.admin.update({
        where: { id },
        data: { is_creator: true },
      });
    }
    return admin;
  }
}
