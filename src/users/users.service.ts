import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { MailService } from '../mail/mail.service';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { decode } from '../helpers/crypto';
import * as uuid from 'uuid';
import { ClassService } from '../class/class.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
    private readonly classService: ClassService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { password, confirm_password, ...data } = createUserDto;
    if (password !== confirm_password) {
      throw new BadRequestException('Parollar mos emas');
    }

    const clas = await this.classService.findOne(createUserDto.classId);
    if (!clas) {
      return {
        message: 'clas not found',
      };
    }
    const activation_link = uuid.v4();
    const accept_link_to_class = uuid.v4() + "classId=" + clas.data?.id;

    const hashedPassword = await bcrypt.hash(password, 7);
    const user = await this.prismaService.user.create({
      data: {
        ...data,
        classId: null,
        hashedPassword: hashedPassword,
        role: ['USER'],
        activation_link: activation_link,
        accept_link_to_class: accept_link_to_class,
      },
    });

    const teacher = await this.prismaService.user.findFirst({
      where: { classId: clas.data?.id, is_teacher: true },
    });
    console.log('teacher: ', teacher);

    if (teacher) {
      try {
        await this.mailService.sendToTeacherMail(teacher, user.accept_link_to_class);
      } catch (error) {
        console.log('errorUserda: ', error);
        throw new BadRequestException("Email bilan bog'liq xatolik");
      }
    }

    try {
      await this.mailService.sendMail(user);
    } catch (error) {
      console.log('errorUserda: ', error);
      throw new BadRequestException("Email bilan bog'liq xatolik");
    }

    return { message: 'Success', data: user };
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
      where: { activation_link: link },
    });
    if (!user) {
      return { message: 'User not found' };
    }

    const isUserActive = await this.prismaService.user.findUnique({
      where: { id: user.id },
    });
    if (isUserActive?.is_active) {
      return { message: 'User already active' };
    }
    const updatedUser = await this.prismaService.user.update({
      where: { id: user.id },
      data: { is_active: true },
    });
    return updatedUser;
  }

  async acceptToClass(link: string) {
    if (!link) {
      throw new BadRequestException("Link yo'q");
    }
    const classId = link.split("classId=")[1]
    const user = await this.prismaService.user.findUnique({
      where: { accept_link_to_class: link },
    });

    if (!user) {
      return { message: 'User not found' };
    }
    if (user.classId) {
      return { message: 'User already exists' };
    }
    console.log("user: ", user);
    const updatedUser = await this.prismaService.user.update({
      where: { id: user.id },
      data: { classId: Number(classId) },
    });
    console.log("classId: ", classId);
    console.log('userim: ', user);
    return updatedUser;
  }

  async findOneByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({ where: { id: Number(id) } });
    if (!user) {
      throw new BadRequestException({
        message: 'User not found',
        status: false,
      });
    }
    return { data: user, status: true };
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

  async createDirector(createUserDto: CreateUserDto){
    const { password, confirm_password, ...data } = createUserDto;
    if (password !== confirm_password) {
      throw new BadRequestException('Parollar mos emas');
    }
    const activation_link = uuid.v4();
    const hashedPassword = await bcrypt.hash(password, 7);
    const user = await this.prismaService.user.create({
      data: {
        ...data,
        classId: null,
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

    return { message: 'Success', data: user };
  }
}
