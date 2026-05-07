import { Elysia } from "elysia";

export const healthRouter = new Elysia({ prefix: "/health" })
    .get("", async ({ set }) => {
        try {
            return { ok: true, service: "api" };
        } catch {
            set.status = 503;
            return { ok: false, service: "api" };
        }
    });
