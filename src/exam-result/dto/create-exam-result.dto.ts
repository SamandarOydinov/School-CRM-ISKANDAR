import { IsString } from "class-validator";

export class CreateExamResultDto {
  @IsString()
  type: string;
  score: number;
  scienceId: number;
  lessonId: number;
  pupilId: number;
}