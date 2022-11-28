import { Injectable } from "@nestjs/common";
import { MAX_PLAYLIST_VIDEOS_PAGE } from "@youtube/youtube.constants";
import {
  Client as YoutubeiClient,
  LiveVideo,
  MixPlaylist,
  PlaylistCompact,
  Transcript,
  Video,
  VideoCompact,
} from "youtubei";

@Injectable()
export class YoutubeiProvider {
  private readonly youtubeClient = new YoutubeiClient();

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

  public async getPlaylistVideos(youtubePlaylistId: string): Promise<VideoCompact[]> {
    const playlist = await this.youtubeClient.getPlaylist(youtubePlaylistId);
    if (!playlist) return [];
    if (playlist instanceof MixPlaylist) return playlist.videos;

    await playlist.videos.next(MAX_PLAYLIST_VIDEOS_PAGE - 1);
    return playlist.videos.items;
  }
}
