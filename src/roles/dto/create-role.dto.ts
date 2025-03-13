import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4, { message: "Kamida 4 ta harfdan iborat bo'lishi kerak" })
  name: string;
}
