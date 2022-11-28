import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { YoutubeModule } from "@youtube/youtube.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { JwtAuthConfigModule } from "./config";
import { JwtAuthProvider } from "./guards";

@Module({
  imports: [ConfigModule, JwtAuthConfigModule, YoutubeModule],
  controllers: [AppController],
  providers: [AppService, JwtAuthProvider],
})
export class AppModule {}
