import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateParentDto {
  @IsString()
  @MaxLength(64, { message: 'Ismingizni 64 ta belgidan ortiq kirita olmaysiz' })
  name: string;
  phone: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: "Email noto'g'ri formatda" })
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: "Parol kamida 8 ta belgidan iborat bo'lishi kerak" })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: "Parol kamida bitta harf va bitta raqamni o'z ichiga olishi kerak",
  })
  password: string;
  confirm_password: string;
}
