import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CommandBus } from "@nestjs/cqrs";
import bcrypt from "bcrypt";

import { CreateUserCommand } from "./commands/impl";
import { UserRepository, User } from "./model";
import { CreateUserDto, FindUserDto } from "./dto";

@Injectable()
export class UserService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService
  ) {
    setImmediate(() => {
      this.boot();
    });
  }

  async boot(): Promise<void> {
    const user = await this.find({
      username: this.configService.get<string>("MONGO_INITDB_ROOT_USERNAME") as string,
    });
    if (!user.length) {
      await this.create({
        username: this.configService.get<string>("MONGO_INITDB_ROOT_USERNAME") as string,
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
    return this.commandBus.execute(new CreateUserCommand(createUserDto));
  }

  async delete(id: string): Promise<void> {
    return this.userRepository.delete(id);
  }
}
