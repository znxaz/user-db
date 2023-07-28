import { Injectable } from "@nestjs/common";
import { prismaService } from "src/prisma/prisma.service";
import { UserDto } from "./dto";
import { NotFoundException } from "@nestjs/common";

@Injectable()
export class UserService 
{
    constructor
    (   private prisma : prismaService, 
    ) {} 

    async update(id: number, user: UserDto) {
      try {
        const updatedUser = await this.prisma.user.update({
          where: { id }, 
          data:
          {
            FirstName: user.FirstName, 
            LastName: user.LastName, 
            role: user.role,
          }
        });
    
        if (!updatedUser) {
          throw new NotFoundException();
        }
    
        return updatedUser;
      } catch (error) {
        // Handle errors appropriately
        console.error('Error updating user:', error);
        throw error;
      }
    }
}
