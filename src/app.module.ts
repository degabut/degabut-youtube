import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { YoutubeModule } from "@youtube/youtube.module";

import { JwtAuthConfigModule } from "./config";
import { YoutubeMusicModule } from "./youtube-music/youtube-music.module";

@Module({
  imports: [ConfigModule, JwtAuthConfigModule, YoutubeModule, YoutubeMusicModule],
})
export class AppModule {}
