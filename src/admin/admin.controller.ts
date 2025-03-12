import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
// import { AdminGuard } from '../common/guards/admin.guard';
import { AdminAuthGuard } from '../guards/admin_auth_guard';
import { AdminCreatorGuard } from '../guards/admin_creator_guard';
import { AdminSelfGuard } from '../guards/admin_self_guard';
import { CreateRoleDto } from '../roles/dto/create-role.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(AdminCreatorGuard)
  @UseGuards(AdminAuthGuard)
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @UseGuards(AdminCreatorGuard)
  @UseGuards(AdminAuthGuard)
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @UseGuards(AdminSelfGuard)
  @UseGuards(AdminAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @UseGuards(AdminCreatorGuard)
  @UseGuards(AdminAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @UseGuards(AdminCreatorGuard)
  @UseGuards(AdminAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }

  @UseGuards(AdminCreatorGuard)
  @UseGuards(AdminAuthGuard)
  @Post('/updateUserRole')
  updateUserRole(@Body() updateUserRole: { userId: number; roleId: number }) {
    return this.adminService.updateUserRole(updateUserRole.userId, updateUserRole.roleId);
  }

  @UseGuards(AdminCreatorGuard)
  @UseGuards(AdminAuthGuard)
  @Post('/addRole')
  addRole(@Body() name: CreateRoleDto) {
    return this.adminService.addRole(name);
  }
}
