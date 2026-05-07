import { Elysia } from "elysia";
import { webhookCallback } from "grammy";
import type { Bot, Context } from "grammy";
import { env } from "../env.ts";

export function webhookRoute(bot: Bot<Context>) {
    const handleUpdate = webhookCallback(bot, "std/http", {
        secretToken: env.WEBHOOK_SECRET,
    });

    return new Elysia({ name: "webhook" }).post("/webhook", ({ request }) =>
        handleUpdate(request),
    );
}
