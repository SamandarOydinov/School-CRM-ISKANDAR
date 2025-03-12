import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HomeWorkSubmissionService } from './home-work-submission.service';
import { CreateHomeWorkSubmissionDto } from './dto/create-home-work-submission.dto';
import { UpdateHomeWorkSubmissionDto } from './dto/update-home-work-submission.dto';

@Controller('home-work-submission')
export class HomeWorkSubmissionController {
  constructor(private readonly homeWorkSubmissionService: HomeWorkSubmissionService) {}

  @Post()
  create(@Body() createHomeWorkSubmissionDto: CreateHomeWorkSubmissionDto) {
    return this.homeWorkSubmissionService.create(createHomeWorkSubmissionDto);
  }

  @Get()
  findAll() {
    return this.homeWorkSubmissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.homeWorkSubmissionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHomeWorkSubmissionDto: UpdateHomeWorkSubmissionDto) {
    return this.homeWorkSubmissionService.update(+id, updateHomeWorkSubmissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.homeWorkSubmissionService.remove(+id);
  }
}
