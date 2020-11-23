import { IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  readonly mobile: string;

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;
}
