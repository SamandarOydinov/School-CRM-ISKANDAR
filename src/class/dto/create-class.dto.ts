import { IsString } from 'class-validator';

export class CreateClassDto {
  @IsString()
  name: string;
  lessonStartDate: Date;
  lessonEndDate: Date;
  room: number;
  roomFloor: number;
  totalPupil: number;
}
