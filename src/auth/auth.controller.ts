import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
              private readonly userService : UserService) {}


  @Post("/signup")
  async createUser(@Body() CreateUserDto:CreateUserDto) {
    return await this.authService.createUser(CreateUserDto)
  }


  @Post("/login")
  async loginuser(@Body() LoginUserDto:LoginUserDto) {
    const user = await this.authService.loginUser(LoginUserDto)
    const token = await this.authService.generateJwtAccessToken(user.id)
    return token
  }

}
