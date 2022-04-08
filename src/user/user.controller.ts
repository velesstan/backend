import { Body, Controller, Get, Post } from "@nestjs/common";

import { CreateUserDto } from "./dto";
import { User } from "./schemas";
import { UserService } from "./user.service";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get("/")
  async getUser(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Post("/")
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }
}
