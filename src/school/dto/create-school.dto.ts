import { IsNotEmpty } from "class-validator";

export class CreateSchoolDto {
    name: string;
    @IsNotEmpty()
    number: number
    location: {lat: number, long: number}
    districtId: number
}