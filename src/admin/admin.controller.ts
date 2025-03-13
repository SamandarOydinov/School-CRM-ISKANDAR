import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
// import { AdminGuard } from '../common/guards/admin.guard';
import { AdminAuthGuard } from '../guards/admin_auth_guard';
import { AdminCreatorGuard } from '../guards/admin_creator_guard';
import { AdminSelfGuard } from '../guards/admin_self_guard';
import { CreateRoleDto } from '../roles/dto/create-role.dto';
import { AdminRolesGuard } from '../guards/admin_roles_guard';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/user_roles_guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(AdminCreatorGuard)
  @UseGuards(AdminAuthGuard)
  @UseGuards(AdminRolesGuard)
  @Roles("SUPERADMIN")
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

  @UseGuards(AdminSelfGuard)
  @UseGuards(AdminAuthGuard)
  @UseGuards(AdminRolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
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
  @UseGuards(AdminRolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Post('/updateUserRole')
  updateUserRole(@Body() updateUserRole: { userId: number; roleId: number }) {
    return this.adminService.updateUserRole(
      updateUserRole.userId,
      updateUserRole.roleId,
    );
  }

  @UseGuards(AdminCreatorGuard)
  @UseGuards(AdminAuthGuard)
  @UseGuards(AdminRolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Post('/updateTeacherClass')
  updateTeacherClass(
    @Body() updateTeacherClass: { teacherId: number; classId: number },
  ) {
    return this.adminService.updateTeacherClass(
      updateTeacherClass.teacherId,
      updateTeacherClass.classId,
    );
  }

  @UseGuards(AdminCreatorGuard)
  @UseGuards(AdminAuthGuard)
  @UseGuards(AdminRolesGuard)
  @Roles('SUPERADMIN')
  @Post('/addRole')
  addRole(@Body() name: CreateRoleDto) {
    return this.adminService.addRole(name);
  }
}
