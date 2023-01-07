import { ThumbnailDto } from "@common/dtos";
import { Exclude, Expose, plainToInstance, Type } from "class-transformer";
import { LiveVideo, Video } from "youtubei";

import { ChannelDto } from "./channel.dto";
import { ChapterDto } from "./chapter.dto";
import { VideoCompactDto } from "./video-compact.dto";

@Exclude()
export class VideoDto {
  @Expose()
  id!: string;

  @Expose()
  title!: string;

  @Expose()
  duration!: number;

  @Expose()
  @Type(() => ThumbnailDto)
  thumbnails!: ThumbnailDto[];

  @Expose()
  viewCount!: number;

  @Expose()
  @Type(() => ChannelDto)
  channel!: ChannelDto;

  @Expose()
  @Type(() => VideoCompactDto)
  related!: VideoCompactDto[];

  @Expose()
  @Type(() => ChapterDto)
  chapters!: ChapterDto[];

  public static create(entity: Video | LiveVideo): VideoDto {
    return plainToInstance(VideoDto, {
      ...entity,
      related: entity.related?.items,
    });
  }
}
