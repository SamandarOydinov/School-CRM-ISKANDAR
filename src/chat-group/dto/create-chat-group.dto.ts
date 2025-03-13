import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateChatGroupDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: "Kamida 3 ta harfdan iborat bo'lishi kerak" })
  name: string;
  classId: number;
}