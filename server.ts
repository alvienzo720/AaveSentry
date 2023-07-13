import express from "express"
import { bot } from "./bot/bot";
const app = express();

const port = 5000 || "";


app.listen(port, () => {

    console.log(`Server Up and Running at http://localhost:${port}`);

})

bot.once('ready', () => {
    console.log("Bot is Ready!");
})
