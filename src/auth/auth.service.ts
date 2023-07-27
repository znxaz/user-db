import { ForbiddenException, Injectable} from '@nestjs/common'; 
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config'; 
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2'
import { AuthDto } from './dto';
import { prismaService } from '../prisma/prisma.service';
@Injectable ()
export class AuthService
{   //dependancy injection
    constructor(private prisma : prismaService, 
        private jwt: JwtService,
        private config: ConfigService
        ) {} 

    async signup(dto : AuthDto)
   {    //hash password 
        const password = await argon.hash(dto.password)
        try{

         // Create a new user in the database
        const user = await this.prisma.user.create 
        ({ data:

            { email: dto.email,

              password,
            },
        }) 
         

        return this.signToken(user.id,user.email); 

        } 
            catch (error) 
            {
                if(error instanceof PrismaClientKnownRequestError)
                {
                    if(error.code === 'P2002')
                    {
                        throw new ForbiddenException('email is already in use')
                    }
            }   }
    };
    


    async signin(dto : AuthDto)
    {
        //find user by email
         const user = await this.prisma.user.findUnique
         ({
            where: {
                email: dto.email,  
            },

         })
            //check if user exists
            if(!user)
            {
                throw new ForbiddenException('user not found'); 
            }

            //check if password is correct
            const ValidPassword = await argon.verify(user.password, dto.password)

            //if password is not correct
            if(!ValidPassword)
            {
                throw new ForbiddenException('Password is incorrect'); 
            }

          
            return this.signToken(user.id,user.email); 
    }

    async signToken(userId: number, email: string): Promise<{ access_token: string }> 
    {
        const payload =
        {
          sub: userId,
          email,
        };
        
        const secret = this.config.get(`JWT_SECRET`);
        
        const token = this.jwt.sign(payload, { expiresIn: '1h', secret: secret });
        
        return { access_token: token };
    }
      
  
} 