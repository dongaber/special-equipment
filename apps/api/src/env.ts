import { requireEnv } from "@special-equipment/env";

function readPort() {
    const rawPort = process.env.API_PORT?.trim() ?? process.env.PORT?.trim() ?? "3000";
    const port = Number.parseInt(rawPort, 10);

    if (!Number.isInteger(port) || port <= 0 || port > 65535) {
        throw new Error(`Invalid API_PORT: ${rawPort}`);
    }

    return port;
}

export const env = {
    PORT: readPort(),
    DATABASE_URL: requireEnv("DATABASE_URL"),
};
