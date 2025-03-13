import { IsNotEmpty, IsString } from "class-validator";

export class CreateScienceDto {
    @IsNotEmpty()
    @IsString()
    name: string
}