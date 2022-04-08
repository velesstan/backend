import { User as IUser } from "@velesstan/common";

/**
 * TBD:
 * Exclude password from DTO
 */
export class FindUserDto implements Partial<IUser> {
  username: string;
}
