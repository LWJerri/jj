import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import "dotenv/config";
import { AppModule } from "./app.module";

const { PORT } = process.env;

async function bootstrap() {
  const loggerService = new Logger("MainBootstrap");
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    rawBody: true,
  });

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(Number(PORT), "0.0.0.0");

  loggerService.log(`Backend started on ${PORT} port`);
}

bootstrap();
