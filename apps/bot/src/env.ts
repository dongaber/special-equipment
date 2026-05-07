import { createEnv, field } from "@special-equipment/env";

export const env = createEnv({
    PORT: field.port(["BOT_PORT", "PORT"], 4000),
    BOT_TOKEN: field.string("BOT_TOKEN"),
    WEBHOOK_SECRET: field.string("WEBHOOK_SECRET"),
    MINI_APP_URL: field.url("MINI_APP_URL"),
});
