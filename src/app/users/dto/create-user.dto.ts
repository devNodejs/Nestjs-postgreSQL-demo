import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsString()
  readonly mobile: string;

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;
}
