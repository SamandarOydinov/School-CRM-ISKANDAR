import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// User Guard
@Injectable()
export class UserGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}
