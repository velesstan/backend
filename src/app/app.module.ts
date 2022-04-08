import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import configuration, { ENV_SCHEMA } from "../config";
import { UserModule } from "../user";

import { AppController } from "./app.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: ENV_SCHEMA,
      validationOptions: {
        abortEarly: true,
      },
      load: [configuration],
      envFilePath: ["app.env"],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>("DB_CONNECTION"),
        };
      },
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
