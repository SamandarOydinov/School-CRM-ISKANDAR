export class CreateSchoolDto {
    name: string;
    number: number
    location: {lat: number, long: number}
    districtId: number
}