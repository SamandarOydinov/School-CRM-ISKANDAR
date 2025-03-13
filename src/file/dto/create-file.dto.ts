import { IsString, MaxLength } from "class-validator"

export class CreateFileDto {
    @IsString()
    @MaxLength(32, {message: "nomiga maximal 32 ta harf kiritish mumkin"})
    name: string
    url: string
}