import { Module } from "@nestjs/common";
import { ConfigModule, registerAs } from "@nestjs/config";

export const jwtAuthConfig = registerAs("jwt", () => ({
  privateKey: process.env.JWT_PRIVATE_KEY as string,
}));

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [jwtAuthConfig],
      validate: (config) => {
        if (!config.JWT_PRIVATE_KEY) throw new Error("JWT_PRIVATE_KEY is not defined");
        return config;
      },
    }),
  ],
})
export class JwtAuthConfigModule {}
