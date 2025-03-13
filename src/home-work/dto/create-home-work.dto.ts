import { IsString, MaxLength } from "class-validator"

export class CreateHomeWorkDto {
    start_date: Date
    end_date: Date

    @IsString()
    @MaxLength(100, {message: "descriptionga maximal 100 ta belgi kiritish mumkin"})
    description: string
    lessonId: number
}