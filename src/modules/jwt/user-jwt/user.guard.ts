import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import {
  JwtUserPayload,
  UserJwtService,
} from 'src/modules/jwt/user-jwt/user-jwt.service';

export type UserRequest = Request & { jwtPayload: JwtUserPayload };

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private userJwtService: UserJwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException('User credentials not found');

    request['jwtPayload'] = await this.userJwtService.verifyToken(token);

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
