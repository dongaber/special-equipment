import { node } from "@elysiajs/node";
import { Elysia } from "elysia";
import { env } from "./env.js";
import { createBot } from "./bot.js";
import { webhookRoute } from "./routes/webhook.js";

const bot = createBot();

const app = new Elysia({ adapter: node() })
    .get("/health", () => ({ ok: true, service: "bot" }))
    .use(webhookRoute(bot))
    .listen(env.PORT, ({ port }) => {
        console.log(`Bot webhook server started on http://localhost:${port}`);
    });

function shutdown() {
    void app.stop();
    process.exit(0);
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
