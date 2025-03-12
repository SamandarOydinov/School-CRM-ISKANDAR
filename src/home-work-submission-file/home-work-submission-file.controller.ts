import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HomeWorkSubmissionFileService } from './home-work-submission-file.service';
import { CreateHomeWorkSubmissionFileDto } from './dto/create-home-work-submission-file.dto';
import { UpdateHomeWorkSubmissionFileDto } from './dto/update-home-work-submission-file.dto';

@Controller('home-work-submission-file')
export class HomeWorkSubmissionFileController {
  constructor(private readonly homeWorkSubmissionFileService: HomeWorkSubmissionFileService) {}

  @Post()
  create(@Body() createHomeWorkSubmissionFileDto: CreateHomeWorkSubmissionFileDto) {
    return this.homeWorkSubmissionFileService.create(createHomeWorkSubmissionFileDto);
  }

  @Get()
  findAll() {
    return this.homeWorkSubmissionFileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.homeWorkSubmissionFileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHomeWorkSubmissionFileDto: UpdateHomeWorkSubmissionFileDto) {
    return this.homeWorkSubmissionFileService.update(+id, updateHomeWorkSubmissionFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.homeWorkSubmissionFileService.remove(+id);
  }
}
