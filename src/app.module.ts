import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { YoutubeModule } from "@youtube/youtube.module";

import { AppController } from "./app.controller";
import { JwtAuthConfigModule } from "./config";
import { JwtAuthProvider } from "./guards";

@Module({
  imports: [ConfigModule, JwtAuthConfigModule, YoutubeModule],
  controllers: [AppController],
  providers: [JwtAuthProvider],
})
export class AppModule {}
