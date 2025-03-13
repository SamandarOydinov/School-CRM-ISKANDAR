import { IsNotEmpty, IsString } from "class-validator";

export class CreateAttendanceDto {
  @IsString()
  @IsNotEmpty()
  status: string; // keldi kelmadi kechikdi
  lessonId: number;
  pupilId: number;
}