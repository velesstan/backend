import { CreateUserCommand } from "./create-user.command";

import { userStub } from "../../tests/stubs/user.stub";

describe("CreateUserCommand", () => {
  describe("When CreateUserCommand constructor is called", () => {
    let command: CreateUserCommand;
    beforeEach(() => {
      command = new CreateUserCommand(userStub());
    });

    test("Then it should return instance", () => {
      expect(command instanceof CreateUserCommand).toBe(true);
    });

    test("Then it should return payload", () => {
      expect(command.payload).toStrictEqual(userStub());
    });
  });
});
