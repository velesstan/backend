import { Test } from "@nestjs/testing";

import { UsersController } from "../user.controller";
import { UserService } from "../user.service";

jest.mock('../user.service')

describe("User controller", () => {
  let userController: UsersController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [UserService],
    }).compile();

    userController = moduleRef.get<UsersController>(UsersController);
    userService = moduleRef.get<UserService>(UserService);
  });

  describe("find users", () => {
    describe("when find is called", () => {
      beforeEach(async () => {
        await userController.find();
      });

      it("then it should call userService", () => {
        expect(userService.find).toHaveBeenCalled();
      });
    });
  });
});
