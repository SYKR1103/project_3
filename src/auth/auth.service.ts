import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { HttpException, HttpStatus} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadInterface } from './tokenPayload.interface';

@Injectable()
export class AuthService {

  constructor(private readonly userService : UserService,
              private readonly configService : ConfigService,
              private readonly jwtService : JwtService) {}


//signup
async createUser(c:CreateUserDto) {
  try{
    return await this.userService.createuser(c)
  } 
  catch(e) {
    console.log(e)
    throw new HttpException("..", HttpStatus.INTERNAL_SERVER_ERROR)
  }
}


//login
async loginUser(l:LoginUserDto) {

  try{
    const User = await this.userService.findUserByemail(l.email)
    const isMatched = await User.checkPassword(l.password)
    if (isMatched) return User
    if (! isMatched) throw new HttpException('zzzzz', HttpStatus.INTERNAL_SERVER_ERROR)
  }   
  catch(e) {
    console.log(e)
    throw new HttpException("..", HttpStatus.INTERNAL_SERVER_ERROR)
  }


}


// jwt 인증부분
public generateJwtAccessToken(userId: string) {

  const payload : TokenPayloadInterface = {userId}
  this.jwtService.sign(payload, {
    secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
    expiresIn : this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME') 
  })



}


}
