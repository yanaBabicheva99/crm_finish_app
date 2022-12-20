import {IsEmail, Length} from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email: string;
  @Length(8, 25)
  password: string;
  name: string;
  lastName: string;
  companyName: string;
  address: string;
}
