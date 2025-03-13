import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "../decorators/roles.decorator";

@Injectable()
export class AdminRolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector
  ) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );
    if (!requiredRoles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    // console.log(authHeader);
    
    if (!authHeader) {
      throw new UnauthorizedException({
        message: "token berilmagan",
      });
    }
    const bearer = authHeader.split(" ")[0];
    const token = authHeader.split(" ")[1];
    if (bearer !== "Bearer" || !token) {
      throw new UnauthorizedException({
        message: "Bearer token berilmagan",
      });
    }

    let admin: any;
    try {
      admin = this.jwtService.verify(token, {
        secret: process.env.ADMIN_ACCESS_TOKEN_KEY,
      });
    } catch {
      throw new UnauthorizedException({ message: "Token verification failed" });
    }
    req.admin = admin;
    console.log("req.admin: ", admin);
    const permission = admin.role.some((role: any) => {
      console.log("required: ", requiredRoles);
      return requiredRoles.includes(role);
    });
    if (!permission) {
      throw new ForbiddenException({
        message: "Sizga ruxsat etilmagan",
      });
    }

    return true;
  }
}
