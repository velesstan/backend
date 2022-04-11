import { CreateUserCommand } from "./create-user/create-user.command";
import { CreateUserHandler } from "./create-user/create-user.handler";

export const CommandHandlers = [CreateUserHandler];

export { CreateUserCommand };
