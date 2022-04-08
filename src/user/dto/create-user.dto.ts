import { User as IUser } from "@velesstan/common";

export class CreateUserDto implements IUser {
  username: string;
  password: string;
}
