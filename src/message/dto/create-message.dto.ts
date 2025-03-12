export class CreateMessageDto {
  message: string;
  data: Date;
  senderId: number;
  groupId: number;
  receivedId: string;
}