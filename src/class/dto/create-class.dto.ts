import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Max, Min, MinLength } from 'class-validator';

export class CreateClassDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: "Kamida 3 ta harfdan iborat bo'lishi kerak" })
  name: string;
  lessonStartDate: Date;
  lessonEndDate: Date;

  @Min(1, { message: "1 dan kichik qavat qo'yish mumkin emas" })
  room: number;

  @Min(1, { message: "1 dan kichik qavat qo'yish mumkin emas" })
  @Max(5, { message: 'Bino 5 qavatlik' })
  roomFloor: number;

  totalPupil: number;
}
