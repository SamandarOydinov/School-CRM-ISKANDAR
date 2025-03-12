import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { HomeWorkService } from './home-work.service';
import { CreateHomeWorkDto } from './dto/create-home-work.dto';
import { UpdateHomeWorkDto } from './dto/update-home-work.dto';
import { RolesGuard } from '../guards/roles_guard';
import { Roles } from '../decorators/roles.decorator';
import { UserAuthGuard } from '../guards/user_auth_guard';
import { UserSelfGuard } from '../guards/user_self_guard';

@Controller('home-work')
export class HomeWorkController {
  constructor(private readonly homeWorkService: HomeWorkService) {}

  @UseGuards(UserSelfGuard)
  @UseGuards(UserAuthGuard)
  @UseGuards(RolesGuard)
  @Roles('TEACHER')
  @Post('/addHomeWork/teacher/:id')
  create(
    @Body() createHomeWorkDto: CreateHomeWorkDto,
    @Param('id') id: number,
  ) {
    return this.homeWorkService.create(createHomeWorkDto, id);
  }

  @UseGuards(RolesGuard)
  @Roles('TEACHER')
  @Get()
  findAll() {
    return this.homeWorkService.findAll();
  }

  @UseGuards(UserSelfGuard)
  @UseGuards(UserAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.homeWorkService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHomeWorkDto: UpdateHomeWorkDto,
  ) {
    return this.homeWorkService.update(+id, updateHomeWorkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.homeWorkService.remove(+id);
  }

  @UseGuards(UserSelfGuard)
  @UseGuards(UserAuthGuard)
  @Get("allMyHomeWorks/pupilId/:id")
  findOneUserById(@Param("id") id: number){
    return this.homeWorkService.findOneByUserId(+id)
  }
}
