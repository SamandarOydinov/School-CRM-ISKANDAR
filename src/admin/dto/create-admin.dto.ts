import { IsEmail, IsPhoneNumber, IsString, MinLength } from "class-validator";

export class CreateAdminDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsPhoneNumber("UZ")
  phone: string
  @MinLength(6)
  password: string;
  confirm_password: string;
}