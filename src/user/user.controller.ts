import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";

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

  @Delete("/:id")
  async delete(@Param("id") id: string): Promise<void> {
    return this.userService.delete(id);
  }
}
