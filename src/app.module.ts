import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module'
import { UserModule } from './Users/user.module'
import { prismaModule } from './prisma/prisma.module';


@Module({
  imports: [AuthModule,UserModule,prismaModule,ConfigModule.forRoot({isGlobal: true}),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
