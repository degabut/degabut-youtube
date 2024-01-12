import { NestFactory } from "@nestjs/core";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import { Logger } from "nestjs-pino";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter(), {});

  app.useLogger(app.get(Logger));
  app.listen(+(process.env.PORT || 8080), "0.0.0.0");
}
bootstrap();
