import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './model/user.model';
import { genSalt, hash, compare } from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { JwtPayload } from './auth/jwt-payload.model';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '../../shared/config/config.service';
import { Save } from './model/save.model';
import { Message } from '../../config/message';
import * as CryptoJs from 'crypto-js';

@Injectable()
export class UsersService {
  private readonly jwtPrivateKey: string;

  constructor(
    @Inject('User')
    private readonly userModel: typeof User,

    @Inject('Save')
    private readonly saveModel: typeof Save,

    private readonly configService: ConfigService,
  ) {
    this.jwtPrivateKey = this.configService.jwtConfig.privateKey;
  }

  async signToken(user: User) {
    const payload: JwtPayload = {
      email: user.email,
      id: user.id,
    };
    return sign(payload, this.jwtPrivateKey, {});
  }

  async getUserByEmail(email: string) {
    return await this.userModel.findOne<User>({
      where: { email },
    });
  }

  async register(data, res): Promise<User> {
    try {
      data.email = data.email.trim().toLowerCase();
      const salt = await genSalt(10);
      data.password = await hash(data.password, salt);

      const registerUser = await this.userModel.create<User>(data);

      return res.status(201).send({
        code: 201,
        message: Message.infoMessage.signupUser,
        data: registerUser,
        error: [],
      });
    } catch (err) {
      console.log('in catch in err');
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async login(data, res) {
    const email = data.email;
    const password = data.password;

    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new HttpException(
        'Invalid email or password.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new HttpException(
        'Invalid email or password.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = await this.signToken(user);
    const loginDataWithToken = {
      token: 'JWT ' + token,
      userDetails: user,
    };
    return res.status(200).send({
      code: 200,
      message: Message.infoMessage.login,
      data: loginDataWithToken,
      error: [],
    });
  }

  async getAllUser(res) {
    const users = await this.userModel.findAll<User>();
    const getalluser = users.map((user) => new UserDto(user));
    // return users.map(user => new UserDto(user));
    return res.status(200).send({
      code: 200,
      message: Message.infoMessage.getDetails,
      data: getalluser,
      error: [],
    });
  }

  async viewUserDetail(id: string, res) {
    const user = await this.userModel.findByPk<User>(id);
    if (!user) {
      throw new HttpException(
        'User with given id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    // return new UserDto(user);
    const viewDetail = user;
    return res.status(200).send({
      code: 200,
      message: Message.infoMessage.getUsers,
      data: viewDetail,
      error: [],
    });
  }

  async updateUserDetail(id: string, data, res) {
    // // console.log('updateUserDto :>> ', updateUserDto);
    const user = await this.userModel.findByPk<User>(id);
    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    try {
      // const updatData = await user.save()
      const todo = this._assign(user, data);
      const updatData = await todo.save();

      return res.status(200).send({
        code: 200,
        message: Message.infoMessage.editUser,
        data: updatData,
        error: [],
      });
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private _assign(user, newValue): User {
    for (const key of Object.keys(user['dataValues'])) {
      if (user[key] !== newValue[key]) {
        user[key] = newValue[key];
      }
    }
    return user as User;
  }

  async userDelete(id: string, res) {
    const user = await this.userModel.findByPk<User>(id);
    await user.destroy();
    return res.status(200).send({
      code: 200,
      message: Message.infoMessage.deleteUser,
      data: [],
      error: [],
    });
  }

  async saveUser(data, res) {
    try {
      data.email = data.email.trim().toLowerCase();


      const salt = await genSalt(10);
      data.password = await hash(data.password, salt);
      // const userData = await user.save()
      // return
      const saveUserDetail = await this.saveModel.create<Save>(data);

      return res.status(201).send({
        code: 201,
        message: Message.infoMessage.saveUser,
        data: saveUserDetail,
        error: [],
      });
    } catch (err) {
      console.log('in catch in err');
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
