import { PartialType } from '@nestjs/mapped-types';
import { CreateHomeWorkSubmissionDto } from './create-home-work-submission.dto';

export class UpdateHomeWorkSubmissionDto extends PartialType(CreateHomeWorkSubmissionDto) {}
