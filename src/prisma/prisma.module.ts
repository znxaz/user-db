import { Module, Global } from '@nestjs/common';
import { prismaService } from './prisma.service';


@Global()

@Module
 ({

    exports: [prismaService],
    providers: [prismaService],
 })


export class prismaModule {} 