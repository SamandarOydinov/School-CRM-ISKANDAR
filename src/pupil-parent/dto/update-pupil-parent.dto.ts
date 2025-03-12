import { PartialType } from '@nestjs/mapped-types';
import { CreatePupilParentDto } from './create-pupil-parent.dto';

export class UpdatePupilParentDto extends PartialType(CreatePupilParentDto) {}
