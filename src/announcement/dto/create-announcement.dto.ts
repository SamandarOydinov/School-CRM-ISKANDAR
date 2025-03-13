import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateAnnouncementDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: "Kamida 3 ta harfdan iborat bo'lishi kerak" })
  title: string;
  
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: "Kamida 10 ta harfdan iborat bo'lishi kerak" })
  message: string;

  data: Date;

  receivedId: string;
  
  senderId: number;
}