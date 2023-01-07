import { ThumbnailDto } from "@common/dtos";
import { Exclude, Expose, plainToInstance, Type } from "class-transformer";
import { Chapter } from "youtubei";

@Exclude()
export class ChapterDto {
  @Expose()
  title!: string;

  @Expose()
  start!: number;

  @Expose()
  @Type(() => ThumbnailDto)
  thumbnails!: ThumbnailDto[];

  public static create(entity: Chapter): ChapterDto {
    return plainToInstance(ChapterDto, entity);
  }
}
