import { IsString } from "class-validator"

export class CreateHomeWorkSubmissionDto {
    status: string
    score: number
    description: string
    homeWorkId: number
    pupilId: number
}