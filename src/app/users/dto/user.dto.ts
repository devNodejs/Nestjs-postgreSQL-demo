import { User } from '../model/user.model';

export class UserDto {
  id: string;
  readonly email: string;
  readonly password: string;
  readonly mobile: string;
  readonly firstName: string;
  readonly lastName: string;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.password = user.password;
    this.mobile = user.mobile;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }
}
