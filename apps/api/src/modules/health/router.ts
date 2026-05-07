import { Elysia } from "elysia";

export const healthRouter = new Elysia({ prefix: "/health" }).get("", () => ({
    ok: true,
    service: "api",
}));
