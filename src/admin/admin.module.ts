import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { RolesService } from '../roles/roles.service';
import { UsersService } from '../users/users.service';
import { MailModule } from '../mail/mail.module';
import { UsersModule } from '../users/users.module';
import { RolesModule } from '../roles/roles.module';
import { ClassModule } from '../class/class.module';

@Module({
  imports: [PrismaModule, UsersModule, RolesModule, ClassModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
