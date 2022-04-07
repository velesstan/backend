import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
// import { MongooseModule } from "@nestjs/mongoose";

import { AppController } from "./app.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['app.env'],
      load: [],
    }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => {
    //     return {};
    //   },
    // }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
