import { Module } from "@nestjs/common";

import { YoutubeiProvider } from "./providers";

@Module({
  providers: [YoutubeiProvider],
  exports: [YoutubeiProvider],
})
export class YoutubeModule {}
