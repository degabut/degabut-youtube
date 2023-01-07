import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtAuthProvider } from "src/guards";

import { YoutubeiProvider } from "./providers";
import { YoutubeController } from "./youtube.controller";

@Module({
  imports: [ConfigModule],
  providers: [YoutubeiProvider, JwtAuthProvider],
  exports: [YoutubeiProvider],
  controllers: [YoutubeController],
})
export class YoutubeModule {}
