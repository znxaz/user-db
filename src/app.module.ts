import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module'
import { UserModule } from './users/user.module'
import { prismaModule } from './prisma/prisma.module';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './auth/Roles';


@Module({
  imports: [AuthModule,
    UserModule,
    prismaModule,
    ConfigModule.forRoot({isGlobal: true}),
    AccessControlModule.forRoles(roles)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
