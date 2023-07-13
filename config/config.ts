import "dotenv/config";

export const configParams = {
    BOT_KEY: process.env.DISCORD_BOT_KEY || "",
    USER_ID: process.env.USER_ID || ""
}
