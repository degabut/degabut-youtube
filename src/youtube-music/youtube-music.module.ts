import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtAuthProvider } from "src/guards";

import { YoutubeiMusicProvider } from "./providers";
import { YoutubeMusicController } from "./youtube-music.controller";

@Module({
  imports: [ConfigModule],
  providers: [YoutubeiMusicProvider, JwtAuthProvider],
  exports: [YoutubeiMusicProvider],
  controllers: [YoutubeMusicController],
})
export class YoutubeMusicModule {}
