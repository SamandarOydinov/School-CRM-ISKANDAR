import { PartialType } from '@nestjs/mapped-types';
import { CreateScienceDto } from './create-science.dto';

export class UpdateScienceDto extends PartialType(CreateScienceDto) {}
