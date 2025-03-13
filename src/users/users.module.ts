import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { MailService } from '../mail/mail.service';
import { MailModule } from '../mail/mail.module';
import { ClassModule } from '../class/class.module';

@Module({
  imports: [PrismaModule, MailModule, ClassModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
