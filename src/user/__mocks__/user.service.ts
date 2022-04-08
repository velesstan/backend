import { userStub } from "../tests/stubs/user.stub";

export const UserService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(userStub()),
  find: jest.fn().mockResolvedValue([userStub()]),
  delete: jest.fn().mockResolvedValue(void null),
});
