import { CommandHandler, ICommandHandler, EventBus } from "@nestjs/cqrs";
import bcrypt from "bcrypt";

import { UserRepository, User } from "../../model";

import { CreateUserCommand } from "./create-user.command";
import { UserCreatedEvent } from "../../events";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand, User> {
  constructor(private readonly userRepository: UserRepository, private readonly eventBus: EventBus) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const { password, ...rest } = command.payload;
    const user = await this.userRepository.create({
      ...rest,
      password: await bcrypt.hash(password, 10),
    });

    this.eventBus.publish(new UserCreatedEvent(command.payload));

    return user.toJSON();
  }
}
