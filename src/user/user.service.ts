import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import bcrypt from "bcrypt";

import { CreateUserDto, FindUserDto } from "./dto";
import { User } from "./schemas";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository, private readonly configService: ConfigService) {
    setImmediate(() => {
      this.boot();
    });
  }

  async boot(): Promise<void> {
    const user = await this.userRepository.findOne({
      username: this.configService.get<string>("MONGO_INITDB_ROOT_USERNAME"),
    });
    if (!user) {
      await this.userRepository.create({
        username: this.configService.get<string>("MONGO_INITDB_ROOT_USERNAME"),
        password: await bcrypt.hash(this.configService.get<string>("MONGO_INITDB_ROOT_PASSWORD") as string, 10),
      });
    }
  }

  async find(query?: FindUserDto): Promise<User[]> {
    return this.userRepository.find({
      ...query,
    });
  }

  async create(createUserDto: CreateUserDto) {
    const { password, ...rest } = createUserDto;
    return this.userRepository.create({
      ...rest,
      password: await bcrypt.hash(password, 10),
    });
  }

  async delete(id: string): Promise<void> {
    return this.userRepository.delete(id);
  }
}
