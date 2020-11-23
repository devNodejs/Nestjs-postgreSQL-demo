import {
  Controller,
  Post,
  Body,
  Delete,
  Req,
  UseGuards,
  Res,
} from '@nestjs/common';
import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  public async register(@Res() res, @Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto, res);
  }

  @Post('/login')
  async login(@Res() res, @Body() userLoginRequestDto: UserLoginRequestDto) {
    return this.usersService.login(userLoginRequestDto, res);
  }

  @Post('/getAllUser')
  // @UseGuards(AuthGuard('jwt'))
  async getAllUser(@Res() res) {
    return this.usersService.getAllUser(res);
  }

  @Post('/viewUserDetail')
  // @UseGuards(AuthGuard('jwt'))
  async viewUserDetail(@Res() res, @Req() request) {
    // const exe = request.headers.authorization.split(' ')
    // console.log('exe :>> ', exe)
    // return
    // const decode = jwt.verify(exe[1], 'jwtPrivateKey')

    // console.log('decode :>> ', decode)
    // return
    // console.log("request :---",request.body.id);
    const id = request.body.id;
    // return
    return this.usersService.viewUserDetail(id, res);
  }

  @Post('/updateUserDetail')
  //   @UseGuards(AuthGuard('jwt'))
  async updateUserDetail(
    @Body() updateUserDto: UpdateUserDto,
    @Req() request,
    @Res() res,
  ) {
    const id = request.body.id;
    return this.usersService.updateUserDetail(id, updateUserDto, res);
  }

  @Delete('/userDelete')
  @UseGuards(AuthGuard('jwt'))
  async userDelete(@Req() request, @Res() res) {
    const id = request.body.id;
    return this.usersService.userDelete(id, res);
  }

  @Post('/saveUser')
  public async saveUser(@Res() res, @Body() createUserDto: CreateUserDto) {
    return this.usersService.saveUser(createUserDto, res);
  }
}
