import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";

import { User as IUser } from "@velesstan/common";

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User implements IUser {
  @Prop({
    unique: true,
  })
  username: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
