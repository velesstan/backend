import { Injectable } from "@nestjs/common";

import { CreateUserDto } from "./dto";
import { User } from "./schemas";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.find({});
  }

  async createUser(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }
}
