import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";

import { User, UserSchema, UserRepository } from "./model";
import { CommandHandlers } from "./commands";
import { EventHandlers } from "./events";
import { UsersController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), CqrsModule],
  controllers: [UsersController],
  providers: [UserRepository, UserService, ...CommandHandlers, ...EventHandlers],
})
export class UserModule {}
