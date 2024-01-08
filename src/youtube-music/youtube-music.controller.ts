import { Controller, Get, NotFoundException, Param, Query, UseGuards } from "@nestjs/common";
import {
  MusicAlbumCompact,
  MusicPlaylistCompact,
  MusicSongCompact,
  MusicVideoCompact,
} from "youtubei";

import { AuthGuard } from "../guards";
import {
  MusicAlbumCompactDto,
  MusicLyricsDto,
  MusicPlaylistCompactDto,
  MusicSongCompactDto,
  MusicVideoCompactDto,
} from "./dtos";
import { MusicSongsDto } from "./dtos/music-songs.dto";
import { YoutubeiMusicProvider } from "./providers";

type IdParams = {
  id: string;
};

type SearchQuery = {
  keyword: string;
};

type ContinuationQuery = {
  token: string;
};

@Controller({ path: "/music" })
export class YoutubeMusicController {
  constructor(private readonly youtubeiMusic: YoutubeiMusicProvider) {}

  @Get("/search")
  @UseGuards(AuthGuard)
  async search(@Query() query: SearchQuery) {
    const result = await this.youtubeiMusic.search(query.keyword);
    return result.map(({ title, items }) => ({
      title,
      items: items.map((item) => {
        if (item instanceof MusicSongCompact) return MusicSongCompactDto.create(item);
        if (item instanceof MusicVideoCompact) return MusicVideoCompactDto.create(item);
        if (item instanceof MusicPlaylistCompact) return MusicPlaylistCompactDto.create(item);
        if (item instanceof MusicAlbumCompact) return MusicAlbumCompactDto.create(item);
      }),
    }));
  }

  @Get("/songs")
  @UseGuards(AuthGuard)
  async searchSong(@Query() query: SearchQuery) {
    const result = await this.youtubeiMusic.searchSong(query.keyword);
    return MusicSongsDto.create(result);
  }

  @Get("/songs/:id/lyrics")
  @UseGuards(AuthGuard)
  async getVideo(@Param() params: IdParams) {
    const lyrics = await this.youtubeiMusic.getLyrics(params.id);
    if (!lyrics) throw new NotFoundException();
    return MusicLyricsDto.create(lyrics);
  }

  @Get("/continuation/songs")
  @UseGuards(AuthGuard)
  async getPlaylistVideos(@Query() query: ContinuationQuery) {
    const songs = await this.youtubeiMusic.getSearchSongContinuation(query.token);
    return MusicSongsDto.create(songs);
  }
}
