import { userStub } from "../stubs/user.stub";

export class UserModel {
  findOne() {
    return {
      exec: async () => userStub(),
    };
  }
}
