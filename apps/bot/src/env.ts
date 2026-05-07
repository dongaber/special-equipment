import { requireEnv } from "@special-equipment/env";

function readPort() {
    const rawPort = process.env.BOT_PORT?.trim() ?? process.env.PORT?.trim() ?? "4000";
    const port = Number.parseInt(rawPort, 10);

    if (!Number.isInteger(port) || port <= 0 || port > 65535) {
        throw new Error(`Invalid BOT_PORT: ${rawPort}`);
    }

    return port;
}

export const env = {
    PORT: readPort(),
    BOT_TOKEN: requireEnv("BOT_TOKEN"),
    WEBHOOK_SECRET: requireEnv("WEBHOOK_SECRET"),
    MINI_APP_URL: requireEnv("MINI_APP_URL"),
};
