import { ThumbnailDto } from "@common/dtos";
import { Exclude, Expose, plainToInstance, Type } from "class-transformer";
import { Channel } from "youtubei";

@Exclude()
export class ChannelDto {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  @Type(() => ThumbnailDto)
  thumbnails!: ThumbnailDto[];

  public static create(entity: Channel): ChannelDto {
    return plainToInstance(ChannelDto, entity);
  }
}
