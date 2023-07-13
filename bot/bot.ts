import { Client, GatewayIntentBits, REST, Routes } from "discord.js";
import { configParams } from "../config/config";

const commands = [
    {
        name: 'hello',
        description: 'Replies with Hello Your name'
    },


];

const rest = new REST({ version: '10' }).setToken(configParams.BOT_KEY);

async function createCommands() {
    try {
        await rest.put(Routes.applicationCommands(configParams.USER_ID), { body: commands });
    } catch (error) {
        console.error('Error while creating commands: ', error);
    }
}

createCommands()


export const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user?.username}!`);
})

bot.on('interactionCreate', async sayhello => {
    if (!sayhello.isChatInputCommand()) return;

    if (sayhello.commandName === 'hello') {
        await sayhello.reply(`Hello ${bot.user?.username}`)

    }
})

bot.login(configParams.BOT_KEY);
