import { Body, Controller, Get, Post, Query } from "@nestjs/common";

import { CreateUserDto, FindUserDto } from "./dto";
import { User } from "./schemas";
import { UserService } from "./user.service";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get("/")
  async find(@Query() query: FindUserDto): Promise<User[]> {
    return this.userService.find(query);
  }

  @Post("/")
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }
}
