import { LoggerModule } from "@logger/logger.module";
import { LoggerMiddleware } from "@logger/middlewares";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { YoutubeMusicModule } from "@youtube-music/youtube-music.module";
import { YoutubeModule } from "@youtube/youtube.module";

import { JwtAuthConfigModule } from "./config";

@Module({
  imports: [ConfigModule, LoggerModule, JwtAuthConfigModule, YoutubeModule, YoutubeMusicModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
