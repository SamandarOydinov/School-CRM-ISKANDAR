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
import { HomeWorkService } from './home-work.service';
import { CreateHomeWorkDto } from './dto/create-home-work.dto';
import { UserAuthGuard } from '../guards/user_auth_guard';
import { UserSelfGuard } from '../guards/user_self_guard';
import { RolesGuard } from '../guards/user_roles_guard';
import { Roles } from '../decorators/roles.decorator';
import { UpdateHomeWorkDto } from './dto/update-home-work.dto'

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
  @Get('/allHomeWorks/teacher/:id')
  findAll(@Param('id') id: number) {
    return this.homeWorkService.findAll(id);
  }

  @UseGuards(UserSelfGuard)
  @UseGuards(UserAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.homeWorkService.findOne(+id);
  }

  @UseGuards(UserSelfGuard)
  @UseGuards(UserAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHomeWorkDto: UpdateHomeWorkDto,
  ) {
    return this.homeWorkService.update(+id, updateHomeWorkDto);
  }

  @UseGuards(RolesGuard)
  @Roles('TEACHER', 'ADMIN', 'SUPERADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.homeWorkService.remove(+id);
  }

  @UseGuards(UserSelfGuard)
  @UseGuards(UserAuthGuard)
  @Get('allMyHomeWorks/pupilId/:id')
  findManyUserById(@Param('id') id: number) {
    return this.homeWorkService.findManyByUserId(+id);
  }
}
