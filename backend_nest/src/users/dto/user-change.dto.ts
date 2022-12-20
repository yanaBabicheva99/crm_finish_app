import {IsEmail, Length} from "class-validator";

export class UserChangeDto {
  @IsEmail()
  email: string;
  name: string;
  lastName: string;
  companyName: string;
  address: string;
  @Length(8, 25)
  newPassword: string;
  oldPassword: string;
}
