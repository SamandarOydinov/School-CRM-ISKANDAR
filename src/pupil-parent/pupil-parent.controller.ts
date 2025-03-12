import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PupilParentService } from './pupil-parent.service';
import { CreatePupilParentDto } from './dto/create-pupil-parent.dto';
import { UpdatePupilParentDto } from './dto/update-pupil-parent.dto';

@Controller('pupil-parent')
export class PupilParentController {
  constructor(private readonly pupilParentService: PupilParentService) {}

  @Post()
  create(@Body() createPupilParentDto: CreatePupilParentDto) {
    return this.pupilParentService.create(createPupilParentDto);
  }

  @Get()
  findAll() {
    return this.pupilParentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pupilParentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePupilParentDto: UpdatePupilParentDto) {
    return this.pupilParentService.update(+id, updatePupilParentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pupilParentService.remove(+id);
  }
}
