import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class SignInDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: "Email noto'g'ri formatda" })
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: "Parol kamida 8 ta belgidan iborat bo'lishi kerak" })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: "Parol kamida bitta harf va bitta raqamni o'z ichiga olishi kerak",
  })
  readonly password: string;
}
