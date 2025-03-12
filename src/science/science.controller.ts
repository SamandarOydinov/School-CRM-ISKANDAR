import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ScienceService } from './science.service';
import { CreateScienceDto } from './dto/create-science.dto';
import { UpdateScienceDto } from './dto/update-science.dto';

@Controller('science')
export class ScienceController {
  constructor(private readonly scienceService: ScienceService) {}

  @Post()
  create(@Body() createScienceDto: CreateScienceDto) {
    return this.scienceService.create(createScienceDto);
  }

  @Get()
  findAll() {
    return this.scienceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scienceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScienceDto: UpdateScienceDto) {
    return this.scienceService.update(+id, updateScienceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scienceService.remove(+id);
  }
}
