import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { MailService } from '../mail/mail.service';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { decode } from '../helpers/crypto';
import * as uuid from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { password, confirm_password, ...data } = createUserDto;
    if (password !== confirm_password) {
      throw new BadRequestException('Parollar mos emas');
    }

    const activation_link = uuid.v4();

    const hashedPassword = await bcrypt.hash(password, 7);
    const user = await this.prismaService.user.create({
      data: {
        ...data,
        hashedPassword: hashedPassword,
        role: ['USER'],
        activation_link: activation_link,
      },
    });

    try {
      await this.mailService.sendMail(user);
    } catch (error) {
      console.log('errorUserda: ', error);
      throw new BadRequestException("Email bilan bog'liq xatolik");
    }

    return user;
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string | null) {
    const updatedUser = await this.prismaService.user.update({
      data: { hashedRefreshToken: hashed_refresh_token || '' },
      where: { id },
    });
    return updatedUser;
  }


  async activateUser(link: string) {
    if (!link) {
      throw new BadRequestException("Link yo'q");
    }
    const user = await this.prismaService.user.findUnique({
      where: { activation_link: link, is_active: false },
    });
    if(!user){
      throw new BadRequestException("User not found")
    }
    const updatedUser = await this.prismaService.user.update({
      where: { id: user.id },
      data: { is_active: true },
    });
    return updatedUser
  }

  async findOneByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if(!user){
      throw new BadRequestException({message: "User not found", status: false})
    }
    return {data: user, status: true};
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data: { ...updateUserDto },
    });
  }

  remove(id: number) {
    return this.prismaService.user.delete({ where: { id } });
  }
}
