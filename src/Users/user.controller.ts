import { 
     Controller,
     Get,
     Put,
     UseGuards,
     Param,
     Body,
     NotFoundException,
        } from "@nestjs/common";

import { JwtGuard } from "../auth/guard"

import  { User } from '@prisma/client'

import { GetUser } from "../auth/decorator";

import { UserDto } from "./dto";

import { UserService } from "./user.service";

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get('me') 
    getMe(@GetUser() user: User)
    {
        return user ;
    }

    @Put('/updateuser/:id')
  async updateUser(@Param('id') id: string, @Body() user: UserDto) {
    try {
      const updatedUser = await this.userService.update(+id, user);
      if (!updatedUser) {
        throw new NotFoundException();
      }
      return updatedUser;
    } catch (error) {
      // Handle errors appropriately
      throw error;
    }
  }
}
