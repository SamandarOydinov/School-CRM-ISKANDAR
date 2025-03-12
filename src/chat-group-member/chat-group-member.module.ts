import { Module } from '@nestjs/common';
import { ChatGroupMemberService } from './chat-group-member.service';
import { ChatGroupMemberController } from './chat-group-member.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ChatGroupMemberController],
  providers: [ChatGroupMemberService],
})
export class ChatGroupMemberModule {}
