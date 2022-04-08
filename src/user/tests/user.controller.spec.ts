import { Test } from "@nestjs/testing";
import { User } from "@velesstan/common";

import { CreateUserDto } from "../dto";
import { UsersController } from "../user.controller";
import { UserService } from "../user.service";
import { userStub } from "./stubs/user.stub";

jest.mock("../user.service");

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

  describe("Find user", () => {
    describe("When find is called", () => {
      let users: User[];

      beforeEach(async () => {
        users = await userController.find();
      });

      it("then it should call userService", () => {
        expect(userService.find).toHaveBeenCalled();
      });

      it("then it should return a user", () => {
        expect(users[0]).toEqual(userStub());
      });
    });
  });

  describe("Create user", () => {
    describe("When create is called", () => {
      let user: User;
      let createUserDto: CreateUserDto;

      beforeEach(async () => {
        createUserDto = {
          username: userStub().username,
          password: userStub().password,
        };
        user = await userController.create(createUserDto);
      });

      it("then it should call userService", () => {
        expect(userService.create).toHaveBeenCalledWith(createUserDto);
      });

      it("then it should return a user", () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe("Delete user", () => {
    describe("When delete is called", () => {
      beforeEach(async () => {
        userController.delete("user-id");
      });

      it("then it should call userService", () => {
        expect(userService.delete).toHaveBeenCalledWith("user-id");
      });
    });
  });
});
