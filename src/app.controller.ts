import { Controller, Get, NotFoundException, Param, Query, UseGuards } from "@nestjs/common";
import { PlaylistCompactDto, TranscriptDto, VideoCompactDto, VideoDto } from "@youtube/dtos";
import { YoutubeiProvider } from "@youtube/providers";

import { AuthGuard } from "./guards";

type VideoIdParams = {
  id: string;
};

type SearchQuery = {
  keyword: string;
};

@Controller()
export class AppController {
  constructor(private readonly youtubei: YoutubeiProvider) {}

  @Get("/videos/:id")
  @UseGuards(AuthGuard)
  async getVideo(@Param() params: VideoIdParams) {
    const video = await this.youtubei.getVideo(params.id);
    if (!video) throw new NotFoundException();
    return VideoDto.create(video);
  }

  @Get("/videos/:id/transcript")
  @UseGuards(AuthGuard)
  async getVideoTranscript(@Param() params: VideoIdParams) {
    const transcript = await this.youtubei.getVideoTranscript(params.id);
    if (!transcript) throw new NotFoundException();
    return transcript.map(TranscriptDto.create);
  }

  @Get("/videos")
  @UseGuards(AuthGuard)
  async searchVideo(@Query() query: SearchQuery) {
    const videos = await this.youtubei.searchVideo(query.keyword);
    return videos.map(VideoCompactDto.create);
  }

  @Get("/playlists")
  @UseGuards(AuthGuard)
  async searchPlaylist(@Query() query: SearchQuery) {
    const playlists = await this.youtubei.searchPlaylist(query.keyword);
    return playlists.map(PlaylistCompactDto.create);
  }
}
