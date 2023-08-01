import { 
     Controller,
     Get,
     Put,
     UseGuards,
     Param,
     Body,
     NotFoundException,
     Post,
        } from "@nestjs/common";

import { JwtGuard } from "../auth/guard"

import  { User } from '@prisma/client'

import { GetUser } from "../auth/decorator";

import { UserService } from "./user.service";
import { ACGuard, UseRoles } from "nest-access-control";


@UseGuards(JwtGuard)

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(ACGuard)

    @Get('me') 
    @UseRoles({ resource: 'profile', action: 'read', possession: 'any' })
    getMe(@GetUser() user: User)
    {
        return user ;
    }

    
    @Put('/updateuser/:id')
    @UseRoles({ resource: 'profile', action: 'update', possession: 'own' })
  async updateUser(@Param('id') id: string, @Body() user: User) {
    try {
      const updatedUser = await this.userService.update(+id, user);
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
