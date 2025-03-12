import { PartialType } from '@nestjs/mapped-types';
import { CreateHomeWorkSubmissionFileDto } from './create-home-work-submission-file.dto';

export class UpdateHomeWorkSubmissionFileDto extends PartialType(CreateHomeWorkSubmissionFileDto) {}
