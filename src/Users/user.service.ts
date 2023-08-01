import { BadRequestException, Injectable } from "@nestjs/common";
import { prismaService } from "src/prisma/prisma.service";;
import { NotFoundException } from "@nestjs/common";
import { User } from "@prisma/client";

@Injectable()
export class UserService 
{
    constructor
    (   private prisma : prismaService, 
    ) {} 

    async update(id: number, user: User) {

      if (!user.FirstName || !user.LastName) {
        throw new BadRequestException(
          `Missing required fields (FirstName, LastName).`);
      }
      
      try {
        const updatedUser = await this.prisma.user.update({
          where: { id }, 
          data:
          {
            FirstName: user.FirstName, 
            LastName: user.LastName, 
          }
        });
    
        if (!updatedUser) {
          throw new NotFoundException();
        }
    
        return updatedUser;
      } catch (error) {
        
        console.error('Error updating user:', error);
        throw error;
      }
    }
}
