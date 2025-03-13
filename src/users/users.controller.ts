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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserAuthGuard } from '../guards/user_auth_guard';
import { UserSelfGuard } from '../guards/user_self_guard';
import { AdminAuthGuard } from '../guards/admin_auth_guard';
import { RolesGuard } from '../guards/user_roles_guard';
import { Roles } from '../decorators/roles.decorator';
import { AdminRolesGuard } from '../guards/admin_roles_guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AdminAuthGuard)
  @UseGuards(AdminRolesGuard)
  @Roles('ADMIN', 'SUPERADMIN', 'DIRECTOR')
  @Post("createUser")
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AdminAuthGuard)
  @UseGuards(AdminRolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Post("/createDirector")
  createDirector(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createDirector(createUserDto);
  }

  @UseGuards(AdminAuthGuard)
  @UseGuards(AdminRolesGuard)
  @Roles('ADMIN', 'SUPERADMIN', 'DIRECTOR')
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(UserSelfGuard)
  @UseGuards(UserAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(UserSelfGuard)
  @UseGuards(UserAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(AdminAuthGuard)
  @UseGuards(AdminRolesGuard)
  @Roles('ADMIN', 'SUPERADMIN', 'DIRECTOR')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Get('activate/:link')
  async activateUser(@Param('link') link: string) {
    return this.usersService.activateUser(link);
  }

  @Get('acceptToClass/:link')
  async acceptToClass(@Param('link') link: string) {
    return this.usersService.acceptToClass(link);
  }
}
