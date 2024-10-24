import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './modules/category/categories.module';
import { PrismaModule } from './database/prisma.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { JwtModule as OriginalJwtModule } from '@nestjs/jwt';
import { JwtModule } from './modules/jwt/jwt.module';
import { UsersModule } from './modules/user/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env'],
    }),
    OriginalJwtModule.register({
      global: true,
    }),
    JwtModule,
    PrismaModule,
    CategoriesModule,
    PaymentsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
