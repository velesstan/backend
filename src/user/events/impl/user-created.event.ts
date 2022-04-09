import { CreateUserDto } from "../../dto";

export class UserCreatedEvent {
  constructor(public readonly payload: CreateUserDto) {}
}
