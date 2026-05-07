import { Bot } from "grammy";
import { env } from "./env.ts";
import { startHandler } from "./handlers/start.ts";

export function createBot() {
    const bot = new Bot(env.BOT_TOKEN);

    bot.command("start", startHandler);

    bot.catch((err) => {
        console.error("Bot error:", err);
        err.ctx
            ?.reply("Something went wrong. Please try again.")
            .catch((replyErr) => console.error("Failed to send error reply:", replyErr));
    });

    return bot;
}
