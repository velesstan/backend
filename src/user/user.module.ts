import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";

import { User, UserSchema } from "./schemas";
import { UsersController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

import { CommandHandlers } from "./commands/handlers";
import { EventHandlers } from "./events/handlers";

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), CqrsModule],
  controllers: [UsersController],
  providers: [UserRepository, UserService, ...CommandHandlers, ...EventHandlers],
})
export class UserModule {}
