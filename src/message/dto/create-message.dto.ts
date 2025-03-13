import { IsString, MaxLength } from "class-validator";

export class CreateMessageDto {
  @IsString()
  @MaxLength(500, { message: "siz 500 tadan ortiq belgidan xabar kiritishigiz mumkin emas"})
  message: string;
  data: Date;
  senderId: number;
  groupId: number;
  receivedId: string;
}