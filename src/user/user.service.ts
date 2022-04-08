import { Injectable } from "@nestjs/common";

import { CreateUserDto } from "./dto";
import { User } from "./schemas";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {
    setImmediate(() => {
      this.boot();
    });
  }

  async boot(): Promise<void> {
    const user = await this.userRepository.findOne({
      username: "root",
    });
    if (!user) {
      await this.userRepository.create({
        username: "root",
        password: "root",
      });
    }
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find({});
  }

  async createUser(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }
}
