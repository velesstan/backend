import { EventBus } from "@nestjs/cqrs";
import { Test } from "@nestjs/testing";

import { User, UserRepository } from "../../model";
import { userStub } from "../../tests/stubs/user.stub";
import { CreateUserHandler } from "./create-user.handler";

describe("CreateUserHandler", () => {
  let handler: CreateUserHandler;
  let eventBus: EventBus;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateUserHandler,
        {
          provide: EventBus,
          useValue: {
            publish: jest.fn(),
          },
        },
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn().mockResolvedValue({ toJSON: jest.fn().mockReturnValue(userStub()) }),
          },
        },
      ],
    }).compile();
    handler = module.get(CreateUserHandler);
    eventBus = module.get(EventBus);
  });

  describe("execute", () => {
    afterEach(() => {
      (eventBus.publish as jest.Mock).mockClear();
    });

    describe("When execute is called", () => {
      let response: User;
      beforeEach(async () => {
        response = await handler.execute({ payload: userStub() });
      });

      test("Then it should return with user object", async () => {
        expect(response).toStrictEqual(userStub());
      });

      test("Then it should call eventBus", () => {
        expect(eventBus.publish).toBeCalledTimes(1);
      });
    });
  });
});
