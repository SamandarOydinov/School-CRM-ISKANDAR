import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(4, { message: "nomini 4 tadan kamroq belgi kiritib bo'lmaydi" })
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: "Email noto'g'ri formatda" })
  email: string;
  @ApiProperty()
  phone: string;
  role!: string[];
  schoolId: number;
  @Optional()
  is_teacher: boolean
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: "Parol kamida 8 ta belgidan iborat bo'lishi kerak" })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: "Parol kamida bitta harf va bitta raqamni o'z ichiga olishi kerak",
  })
  password: string;
  classId: number;
  confirm_password: string;
}
