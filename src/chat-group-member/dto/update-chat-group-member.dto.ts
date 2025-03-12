import { PartialType } from '@nestjs/mapped-types';
import { CreateChatGroupMemberDto } from './create-chat-group-member.dto';

export class UpdateChatGroupMemberDto extends PartialType(CreateChatGroupMemberDto) {}
