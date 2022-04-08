import { userStub } from "../tests/stubs/user.stub";
import { UserService as Ref } from "../user.service";

export const UserService = jest.fn<Partial<Ref>, any>().mockReturnValue({
  create: jest.fn().mockResolvedValue(userStub()),
  find: jest.fn().mockResolvedValue([userStub()]),
  delete: jest.fn().mockResolvedValue(void null),
});
