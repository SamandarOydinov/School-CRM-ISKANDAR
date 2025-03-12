import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendMail(user: User) {
    console.log("User: ", user);
    const url = `${process.env.API_URL}/api/users/activate/${user.activation_link}`;
    const sms = await this.mailerService.sendMail({
      to: user.email,
      template: './confirm',
      context: {
        name: user.name,
        url,
      },
    });
  }
}