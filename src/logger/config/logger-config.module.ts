import { Module } from "@nestjs/common";
import { ConfigModule, registerAs } from "@nestjs/config";

export const loggerConfig = registerAs("logger", () => ({
  level: (process.env.LOG_LEVEL as string) || "info",
}));

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [loggerConfig],
      validationOptions: {
        abortEarly: false,
      },
    }),
  ],
})
export class LoggerConfigModule {}
