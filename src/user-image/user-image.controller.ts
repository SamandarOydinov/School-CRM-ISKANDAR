import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserImageService } from './user-image.service';
import { CreateUserImageDto } from './dto/create-user-image.dto';
import { UpdateUserImageDto } from './dto/update-user-image.dto';

@Controller('user-image')
export class UserImageController {
  constructor(private readonly userImageService: UserImageService) {}

  @Post()
  create(@Body() createUserImageDto: CreateUserImageDto) {
    return this.userImageService.create(createUserImageDto);
  }

  @Get()
  findAll() {
    return this.userImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userImageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserImageDto: UpdateUserImageDto) {
    return this.userImageService.update(+id, updateUserImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userImageService.remove(+id);
  }
}
