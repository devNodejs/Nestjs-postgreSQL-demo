import { Save } from '../model/save.model';

export class SaveDto {
  id: string;
  readonly email: string;
  readonly password: string;
  readonly mobile: string;
  readonly firstName: string;
  readonly lastName: string;

  constructor(save: Save) {
    this.id = save.id;
    this.email = save.email;
    this.password = save.password;
    this.mobile = save.mobile;
    this.firstName = save.firstName;
    this.lastName = save.lastName;
  }
}
