import { Client, GatewayIntentBits, REST, Routes } from "discord.js";
import { configParams } from "../config/config";
import { getBalanceLinkToken } from "../controllers/getBalance";
import { getPNL, supplyLiquidity } from "../controllers/supplyLiquidity";
import { ethers } from "hardhat";
import { withdrawlLiquidity } from "../controllers/withdrawLiquidity";


const commands = [
    {
        name: 'hello',
        description: 'Replies with Hello Your name'
    },
    {
        name: 'getlinkbalance',
        description: 'Replies with link Balance'
    },
    {
        name: 'getalinkbalance',
        description: 'Replies with alink Balance'
    },
    {
        name: 'supplyliquidity',
        description: 'Replies with supllied liquidity'
    },
    {
        name: 'withdrawal',
        description: 'Replies with supllied liquidity'
    },
    {
        name: 'pnl',
        description: 'Replies with Profit And Loss Gained'
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

bot.on('interactionCreate', async getlinkbalanceeth => {
    try {
        if (!getlinkbalanceeth.isChatInputCommand()) return;
        if (getlinkbalanceeth.commandName === 'getlinkbalance') {
            const balance = await getBalanceLinkToken(configParams.LINK_ADDRESS);
            let response = `You have :${balance} LINK in your contract`;
            await getlinkbalanceeth.reply(response);
        }
    } catch (error) {
        console.log(error);
    }
})

bot.on('interactionCreate', async getalinkbalanceeth => {
    try {
        if (!getalinkbalanceeth.isChatInputCommand()) return;
        if (getalinkbalanceeth.commandName === 'getalinkbalance') {
            const balance = await getBalanceLinkToken(configParams.aLINK_ADDRESS);
            let response = `You have :${balance} LINK in your contract`;
            await getalinkbalanceeth.reply(response);
        }
    } catch (error) {
        console.log(error);
    }
})

bot.on('interactionCreate', async supplyliquidityeth => {
    try {
        if (!supplyliquidityeth.isChatInputCommand()) return;
        if (supplyliquidityeth.commandName === 'supplyliquidity') {
            const amount = ethers.utils.parseUnits('100', '18');
            let response = await supplyLiquidity(configParams.LINK_ADDRESS, amount);
            if (typeof response !== 'string') {
                response = JSON.stringify(response);
            }
            await supplyliquidityeth.reply(response);
        }
    } catch (error) {
        console.log(error);
    }
})

bot.on('interactionCreate', async withdrawaleth => {
    try {
        if (!withdrawaleth.isChatInputCommand()) return;
        if (withdrawaleth.commandName === 'withdrawal') {
            let response = await withdrawlLiquidity(configParams.LINK_ADDRESS);
            if (typeof response !== 'string') {
                response = JSON.stringify(response);
            }
            await withdrawaleth.reply(response);
        }
    } catch (error) {
        console.log(error);
    }
})

bot.on('interactionCreate', async profitloss => {
    try {
        if (!profitloss.isChatInputCommand()) return;
        if (profitloss.commandName === 'pnl') {
            let response = await getPNL(configParams.CONTRACT_ADDRESS);
            if (typeof response !== 'string') {
                response = JSON.stringify(response);
            }
            await profitloss.reply(response);
        }
    } catch (error) {
        console.log(error);
    }
})


bot.login(configParams.BOT_KEY);
