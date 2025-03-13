import { IsNotEmpty, IsString } from "class-validator"

export class CreateTimeTableDto {
    @IsString()
    @IsNotEmpty()
    day: string
    @IsNotEmpty()
    which_period: number
    lessonId: number 
}