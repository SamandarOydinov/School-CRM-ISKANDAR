import { PartialType } from '@nestjs/mapped-types';
import { CreateTeacherFanDto } from './create-teacher-fan.dto';

export class UpdateTeacherFanDto extends PartialType(CreateTeacherFanDto) {}
