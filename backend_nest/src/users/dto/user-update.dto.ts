import {IsEmail} from "class-validator";

export class UserUpdateDto {
  @IsEmail()
  email: string;
  name: string;
  lastName: string;
  companyName: string;
  address: string;
}
