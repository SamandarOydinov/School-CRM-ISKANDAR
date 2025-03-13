import { IsString, MaxLength } from "class-validator";

export class CreateLessonDto {
  @IsString()
  @MaxLength(32, {message: "siz maximal 32 ta belgi kiritishingiz mumkin"})
  title: string;
  starts: Date;
  finishes: Date;
  groupId: number;
  teacherId: number;
  scienceId: number;
}
