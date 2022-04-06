import { Controller, Get } from "@nestjs/common";

const packageJson = require("../../package.json");

@Controller()
export class AppController {
  @Get("/status")
  async version() {
    return {
      environment: process.env.STAGE,
      version: packageJson.version,
    };
  }
}
