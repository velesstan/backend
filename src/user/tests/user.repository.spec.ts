import { Test } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";

import { User, UserRepository } from "../model";
import { UserModel } from "./helpers/user.model";
import { userStub } from "./stubs/user.stub";

describe("User repository", () => {
  let userRepository: UserRepository;
  let userModel: UserModel;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getModelToken(User.name),
          useClass: UserModel,
        },
      ],
    }).compile();

    userRepository = moduleRef.get<UserRepository>(UserRepository);
    userModel = moduleRef.get<UserModel>(getModelToken(User.name));

    jest.clearAllMocks();
  });

  describe("findOne", () => {
    describe("When findOne is called", () => {
      let user: User | null;
      beforeEach(async () => {
        jest.spyOn(userModel, "findOne");
        user = await userRepository.findOne({ username: "root" });
      });

      test("Then it should call userModel", () => {
        expect(userModel.findOne).toHaveBeenCalled();
      });

      test("Then it should return a user", () => {
        expect(user).toStrictEqual(userStub());
      });
    });
  });
});
