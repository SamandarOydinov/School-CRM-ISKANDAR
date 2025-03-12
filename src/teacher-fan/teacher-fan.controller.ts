import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TeacherFanService } from './teacher-fan.service';
import { CreateTeacherFanDto } from './dto/create-teacher-fan.dto';
import { UpdateTeacherFanDto } from './dto/update-teacher-fan.dto';
import { UserAuthGuard } from '../guards/user_auth_guard';
import { RolesGuard } from '../guards/roles_guard';
import { Roles } from '../decorators/roles.decorator';

@Controller('teacher-fan')
export class TeacherFanController {
  constructor(private readonly teacherFanService: TeacherFanService) {}

  @Post()
  create(@Body() createTeacherFanDto: CreateTeacherFanDto) {
    return this.teacherFanService.create(createTeacherFanDto);
  }

  @Get()
  findAll() {
    return this.teacherFanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherFanService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTeacherFanDto: UpdateTeacherFanDto,
  ) {
    return this.teacherFanService.update(+id, updateTeacherFanDto);
  }

  @UseGuards(UserAuthGuard)
  @UseGuards(RolesGuard)
  @Roles('DIRECTOR')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherFanService.remove(+id);
  }
}
