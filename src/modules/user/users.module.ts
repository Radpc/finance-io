import { Module } from '@nestjs/common';
import { LoginService } from './use-cases/login/login.service';
import { LoginController } from './use-cases/login/login.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { UserRepoService } from 'src/database/repositories/user/user-repo.service';

@Module({
  imports: [PrismaModule],
  controllers: [LoginController],
  providers: [UserRepoService, LoginService],
})
export class UsersModule {}
