import { Injectable } from "@nestjs/common";
import {
  Client as YoutubeiClient,
  LiveVideo,
  MixPlaylist,
  Playlist,
  PlaylistCompact,
  PlaylistVideos,
  Transcript,
  Video,
  VideoCompact,
} from "youtubei";

@Injectable()
export class YoutubeiProvider {
  private readonly youtubeClient = new YoutubeiClient();

  public async search(keyword: string): Promise<(VideoCompact | PlaylistCompact)[]> {
    const result = await this.youtubeClient.search(keyword);
    return result.items.filter(
      (r): r is VideoCompact | PlaylistCompact =>
        r instanceof VideoCompact || r instanceof PlaylistCompact,
    );
  }

  public async searchPlaylist(keyword: string): Promise<PlaylistCompact[]> {
    const playlist = await this.youtubeClient.search(keyword, {
      type: "playlist",
    });
    return playlist.items;
  }

  public async searchVideo(keyword: string): Promise<VideoCompact[]> {
    const videos = await this.youtubeClient.search(keyword, { type: "video" });
    return videos.items;
  }

  public async getVideo(id: string): Promise<Video | LiveVideo | undefined> {
    const video = await this.youtubeClient.getVideo(id);
    if (!video) return;

    video.related.items = video.related.items.filter((r) => r instanceof VideoCompact);
    return video;
  }

  public async getVideoTranscript(id: string): Promise<Transcript[] | undefined> {
    const transcript = await this.youtubeClient.getVideoTranscript(id);
    return transcript?.map((t) => new Transcript(t));
  }

  public async getPlaylist(id: string): Promise<MixPlaylist | Playlist | undefined> {
    const playlist = await this.youtubeClient.getPlaylist(id);
    return playlist;
  }

  public async getPlaylistVideosContinuation(token: string): Promise<PlaylistVideos> {
    const playlistVideos = new PlaylistVideos({
      client: this.youtubeClient,
      playlist: new Playlist({ client: this.youtubeClient }),
    });
    playlistVideos.continuation = token;
    await playlistVideos.next();

    return playlistVideos;
  }
}
