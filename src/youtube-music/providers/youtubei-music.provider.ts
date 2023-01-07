import { Injectable } from "@nestjs/common";
import {
  MusicAlbumCompact,
  MusicArtistCompact,
  MusicClient as YoutubeiMusicClient,
  MusicPlaylistCompact,
  MusicSongCompact,
  MusicVideoCompact,
  Shelf,
} from "youtubei";
import { MusicLyrics } from "youtubei/dist/typings/music/MusicLyrics";

type SearchResult = Shelf<
  MusicSongCompact[] | MusicVideoCompact[] | MusicAlbumCompact[] | MusicPlaylistCompact[]
>[];

@Injectable()
export class YoutubeiMusicProvider {
  private readonly musicClient = new YoutubeiMusicClient();

  public async search(keyword: string): Promise<SearchResult> {
    const result = await this.musicClient.search(keyword);
    return result.filter((i) => !(i.items.at(0) instanceof MusicArtistCompact)) as SearchResult;
  }

  public async getLyrics(id: string): Promise<MusicLyrics | undefined> {
    return await this.musicClient.getLyrics(id);
  }
}
