import { ThumbnailDto } from "@common/dtos";
import { Exclude, Expose, plainToInstance, Type } from "class-transformer";
import { VideoCompact } from "youtubei";

import { ChannelDto } from "./channel.dto";

@Exclude()
export class VideoCompactDto {
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

  public static create(entity: VideoCompact): VideoCompactDto {
    return plainToInstance(VideoCompactDto, entity);
  }
}
