import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './modules/category/categories.module';
import { PrismaModule } from './database/prisma.module';
import { PaymentsModule } from './modules/payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    CategoriesModule,
    PaymentsModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
