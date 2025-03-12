import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException({
        message: 'token berilmagan',
      });
    }
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({
        message: 'Bearer token berilmagan',
      });
    }

    let user: any;
    try {
      // console.log('token: ', token);
      user = this.jwtService.verify(token, {
        secret: process.env.USER_ACCESS_TOKEN_KEY,
      });
    } catch {
      throw new UnauthorizedException({ message: 'Token verification failed' });
    }
    req.user = user;

    return true;
  }
}
