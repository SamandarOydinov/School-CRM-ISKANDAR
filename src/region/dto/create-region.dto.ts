import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateRegionDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: "Kamida 3 ta harfdan iborat bo'lishi kerak" })
  name: string;
}