import { PartialType } from '@nestjs/mapped-types';
import { CreateHomeWorkFileDto } from './create-home-work-file.dto';

export class UpdateHomeWorkFileDto extends PartialType(CreateHomeWorkFileDto) {}
