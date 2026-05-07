import { node } from "@elysiajs/node";
import { Elysia } from "elysia";
import { env } from "./env.js";
import { healthRouter } from "./modules/health/router.js";

const app = new Elysia({ adapter: node() })
    .use(healthRouter)
    .listen(env.PORT, ({ port }) => {
        console.log(`API server started on http://localhost:${port}`);
    });

async function shutdown() {
    await app.stop();
    process.exit(0);
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
