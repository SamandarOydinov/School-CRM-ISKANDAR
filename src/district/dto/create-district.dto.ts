import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateDistrictDto {
  @IsString()
  @MinLength(3, { message: 'Description minimal 3 ta harf kiritilishi kerak' })
  @MaxLength(100, {
    message: 'Description maximal 100 ta harf kiritilishi kerak',
  })
  name: string;
  regionId: number;
}
