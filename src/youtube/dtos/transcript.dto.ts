import { Exclude, Expose, plainToInstance } from "class-transformer";
import { Transcript } from "youtubei";

@Exclude()
export class TranscriptDto {
  @Expose()
  start!: number;

  @Expose()
  end!: number;

  @Expose()
  duration!: number;

  @Expose()
  text!: string;

  public static create(entity: Transcript): TranscriptDto {
    return plainToInstance(TranscriptDto, entity);
  }
}
