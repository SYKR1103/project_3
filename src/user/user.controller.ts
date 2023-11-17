import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createuser(@Body()  c:CreateUserDto){
    return this.userService.createuser(c);
  }

  @Get(':id')
  async findUserById(@Param("id") id:string) {
    return this.userService.findUserById(id);
  }

  @Get(':id')
  async findUserByemail(@Param("id")  email:string) {
    return this.userService.findUserByemail(email);
  }





}
