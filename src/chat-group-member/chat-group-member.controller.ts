import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatGroupMemberService } from './chat-group-member.service';
import { CreateChatGroupMemberDto } from './dto/create-chat-group-member.dto';
import { UpdateChatGroupMemberDto } from './dto/update-chat-group-member.dto';

@Controller('chat-group-member')
export class ChatGroupMemberController {
  constructor(private readonly chatGroupMemberService: ChatGroupMemberService) {}

  @Post()
  create(@Body() createChatGroupMemberDto: CreateChatGroupMemberDto) {
    return this.chatGroupMemberService.create(createChatGroupMemberDto);
  }

  @Get()
  findAll() {
    return this.chatGroupMemberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatGroupMemberService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatGroupMemberDto: UpdateChatGroupMemberDto) {
    return this.chatGroupMemberService.update(+id, updateChatGroupMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatGroupMemberService.remove(+id);
  }
}
