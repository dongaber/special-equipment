import { createEnv, field } from "@special-equipment/env";

export const env = createEnv({
    PORT: field.port(["API_PORT", "PORT"], 3000),
    DATABASE_URL: field.url("DATABASE_URL"),
});
