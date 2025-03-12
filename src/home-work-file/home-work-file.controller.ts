import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HomeWorkFileService } from './home-work-file.service';
import { CreateHomeWorkFileDto } from './dto/create-home-work-file.dto';
import { UpdateHomeWorkFileDto } from './dto/update-home-work-file.dto';

@Controller('home-work-file')
export class HomeWorkFileController {
  constructor(private readonly homeWorkFileService: HomeWorkFileService) {}

  @Post()
  create(@Body() createHomeWorkFileDto: CreateHomeWorkFileDto) {
    return this.homeWorkFileService.create(createHomeWorkFileDto);
  }

  @Get()
  findAll() {
    return this.homeWorkFileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.homeWorkFileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHomeWorkFileDto: UpdateHomeWorkFileDto) {
    return this.homeWorkFileService.update(+id, updateHomeWorkFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.homeWorkFileService.remove(+id);
  }
}
