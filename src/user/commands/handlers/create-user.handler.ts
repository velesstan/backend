import { CommandHandler, ICommandHandler, EventBus } from "@nestjs/cqrs";
import bcrypt from "bcrypt";

import { UserRepository } from "../../user.repository";
import { User } from "../../schemas";

import { CreateUserCommand } from "../impl";
import { UserCreatedEvent } from "../../events/impl";

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
