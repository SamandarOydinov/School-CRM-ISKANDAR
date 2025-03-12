import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { UserAuthGuard } from '../guards/user_auth_guard';
import { UserSelfGuard } from '../guards/user_self_guard';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles_guard';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @UseGuards(UserSelfGuard)
  @UseGuards(UserAuthGuard)
  @UseGuards(RolesGuard)
  @Roles("TEACHER")
  @Post("/adLesson/teacherId/:id")
  create(@Body() createLessonDto: CreateLessonDto, @Param("id") id: number) {
    return this.lessonService.create(createLessonDto, id);
  }

  @Get()
  findAll() {
    return this.lessonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonService.update(+id, updateLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonService.remove(+id);
  }
}
