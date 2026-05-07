import { InlineKeyboard } from "grammy";
import type { Context } from "grammy";
import { env } from "../env.js";

const keyboard = new InlineKeyboard().webApp("Open App", env.MINI_APP_URL);

export async function startHandler(ctx: Context) {
    await ctx.reply("Welcome! 👋", { reply_markup: keyboard });
}
