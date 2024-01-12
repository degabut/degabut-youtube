import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { FastifyReply } from "fastify";
import { IncomingMessage } from "http";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: IncomingMessage, res: FastifyReply["raw"], next: () => void) {
    const url = "originalUrl" in req ? req.originalUrl : req.url;
    this.logger.log({ path: url, method: req.method });
    next();
  }
}
