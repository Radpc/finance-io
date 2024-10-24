import { Global, Module } from '@nestjs/common';
import { UserJwtService } from './user-jwt/user-jwt.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [UserJwtService],
  exports: [UserJwtService],
})
export class JwtModule {}
