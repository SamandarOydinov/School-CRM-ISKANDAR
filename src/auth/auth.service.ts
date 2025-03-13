import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto, UpdateUserDto } from '../users/dto';
import { Admin, User } from '@prisma/client';
import { SignInDto } from './dto/signIn-dto';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { AdminService } from '../admin/admin.service';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { Express } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async userGetTokens(user: User) {
    const payload = {
      name: user.name,
      id: user.id,
      email: user.email,
      is_active: user.is_active,
      role: user.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.USER_ACCESS_TOKEN_KEY,
        expiresIn: process.env.USER_ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.USER_REFRESH_TOKEN_KEY,
        expiresIn: process.env.USER_REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  // for User

  async userSignUp(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const candidate = await this.userService.findOneByEmail(
      createUserDto.email,
    );
    if (candidate) {
      throw new BadRequestException('Bunday foydalanuvchi mavjud');
    }

    const newUser = await this.userService.create(createUserDto);

    const response = {
      message:
        "Tabriklayman tizimga qo'shildingiz. Akkauntni faollashtirish uchun emailga xat yuborildi",
      userId: newUser.data!.id,
    };
    return {
      response: response,
      message:
        "Hurmatli foydalanuvchi siz muvaffaqiyatli ro'yxardan o'tdingiz,Accountingizni faollashtirish uchun emailingizga xabar yuborildi",
    };
  }

  async userSignIn(signInDto: SignInDto, res: Response) {
    const user = await this.userService.findOneByEmail(signInDto.email);
    if (!user) {
      throw new UnauthorizedException("Eamil yoki password noto'g'ri");
    }
    const isvalidPassword = await bcrypt.compare(
      signInDto.password,
      user.hashedPassword,
    );

    if (!isvalidPassword) {
      throw new UnauthorizedException("Eamil yoki password noto'g'ri");
    }
    const tokens = await this.userGetTokens(user);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updatedUser = await this.userService.updateRefreshToken(
      user.id,
      hashed_refresh_token,
    );
    if (!updatedUser) {
      throw new InternalServerErrorException('Tokenni saqlashda xatolik');
    }
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000, // process.env.COOKIE_TIME
      httpOnly: true,
    });
    const response = {
      message: 'User logged in',
      userId: user.id,
      access_token: tokens.access_token,
    };
    return response;
  }

  async userRefreshToken(userId: number, refreshToken: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refreshToken);
    if (userId !== decodedToken['id']) {
      throw new BadRequestException('Ruxsat etilmagan');
    }
    const user = await this.userService.findOne(userId);
    if (!user || !user.data.hashedRefreshToken) {
      throw new BadRequestException('user not found');
    }
    const tokenMatch = await bcrypt.compare(
      refreshToken,
      user.data.hashedRefreshToken,
    );
    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }
    const tokens = await this.userGetTokens(user.data);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    await this.userService.updateRefreshToken(
      user.data.id,
      hashed_refresh_token,
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000, // process.env.COOKIE_TIME
      httpOnly: true,
    });
    const response = {
      message: 'User refreshed',
      id: user.data.id,
      access_token: tokens.access_token,
    };
    return response;
  }


  async userSignOut(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userData) {
      throw new ForbiddenException('User not verified');
    }
    const hashed_refresh_token = null;
    await this.userService.updateRefreshToken(
      userData.id,
      hashed_refresh_token,
    );
    res.clearCookie('user_refresh_token');
    const response = {
      message: 'User logged out succesfully',
    };
    return response;
  }

  // for Director

  async directorSignUp(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const candidate = await this.userService.findOneByEmail(
      createUserDto.email,
    );
    if (candidate) {
      throw new BadRequestException('Bunday foydalanuvchi mavjud');
    }

    const newUser = await this.userService.createDirector(createUserDto);

    const response = {
      message:
        "Tabriklayman tizimga qo'shildingiz. Akkauntni faollashtirish uchun emailga xat yuborildi",
      userId: newUser.data!.id,
    };
    return {
      response: response,
      message:
        "Hurmatli foydalanuvchi siz muvaffaqiyatli ro'yxardan o'tdingiz,Accountingizni faollashtirish uchun emailingizga xabar yuborildi",
    };
  }

  //  for Admin

  async adminGetTokens(admin: Admin) {
    const payload = {
      name: admin.name,
      id: admin.id,
      email: admin.email,
      is_creator: admin.is_creator,
      role: admin.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ADMIN_ACCESS_TOKEN_KEY,
        expiresIn: process.env.ADMIN_ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.ADMIN_REFRESH_TOKEN_KEY,
        expiresIn: process.env.ADMIN_REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async adminSignUp(createAdminDto: CreateAdminDto) {
    const candidate = await this.adminService.findOneByEmail(
      createAdminDto.email,
    );
    if (candidate) {
      throw new BadRequestException('Bunday foydalanuvchi mavjud');
    }
    const newAdmin = await this.adminService.create(createAdminDto);
    const response = {
      message:
        "Tabriklayman tizimga qo'shildingiz. Akkauntni faollashtirish uchun emailga xat yuborildi",
      adminId: newAdmin.id,
    };
    return response;
  }

  async adminSignIn(signInDto: SignInDto, res: Response) {
    const admin = await this.adminService.findOneByEmail(signInDto.email);
    if (!admin) {
      throw new UnauthorizedException("Eamil yoki password noto'g'ri");
    }
    const isvalidPassword = await bcrypt.compare(
      signInDto.password,
      admin.hashedPassword,
    );

    if (!isvalidPassword) {
      throw new UnauthorizedException("Eamil yoki password noto'g'ri");
    }
    const tokens = await this.adminGetTokens(admin);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updatedAdmin = await this.adminService.updateRefreshToken(
      admin.id,
      hashed_refresh_token,
    );
    if (!updatedAdmin) {
      throw new InternalServerErrorException('Tokenni saqlashda xatolik');
    }
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000, // process.env.ADMIN_COOKIE_TIME
      httpOnly: true,
    });
    const response = {
      message: 'Admin logged in',
      adminId: admin.id,
      access_token: tokens.access_token,
    };
    return response;
  }

  async adminRefreshToken(
    adminId: number,
    refreshToken: string,
    res: Response,
  ) {
    const decodedToken = await this.jwtService.decode(refreshToken);
    if (adminId !== decodedToken['id']) {
      throw new BadRequestException('Ruxsat etilmagan');
    }
    const admin = await this.adminService.findOne(adminId);
    if (!admin || !admin.hashedRefreshToken) {
      throw new BadRequestException('admin not found');
    }
    const tokenMatch = await bcrypt.compare(
      refreshToken,
      admin.hashedRefreshToken,
    );
    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }
    const tokens = await this.adminGetTokens(admin);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    await this.adminService.updateRefreshToken(admin.id, hashed_refresh_token);

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000, // process.env.ADMIN_COOKIE_TIME
      httpOnly: true,
    });
    const response = {
      message: 'Admin refreshed',
      id: admin.id,
      access_token: tokens.access_token,
    };
    return response;
  }

  async adminSignOut(refreshToken: string, res: Response) {
    const adminData = await this.jwtService.verify(refreshToken, {
      secret: process.env.ADMIN_REFRESH_TOKEN_KEY,
    });
    if (!adminData) {
      throw new ForbiddenException('Admin not verified');
    }
    const hashed_refresh_token = null;
    await this.adminService.updateRefreshToken(
      adminData.id,
      hashed_refresh_token,
    );
    res.clearCookie('refresh_token');
    const response = {
      message: 'Admin logged out succesfully',
    };
    return response;
  }

  create(createAuthDto: CreateUserDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateUserDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
