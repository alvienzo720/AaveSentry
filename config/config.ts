import "dotenv/config";
import { ethers } from "hardhat";

export const configParams = {
    BOT_KEY: process.env.DISCORD_BOT_KEY || "",
    USER_ID: process.env.USER_ID || "",
    PRIVATE_KEY: process.env.PRIVATE_KEY || "",
    INFURA_URL: process.env.INFURA_SEPOLIA_HTTP || "",
    LINK_ADDRESS: process.env.LINK_ADDRESS || "",
    aLINK_ADDRESS: process.env.aLINK_ADDRESS || "",
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS || "",
    infrua_key: process.env.infrua_key || "",
    SERVER_ID:process.env.SERVER_ID || ""
}

export const provider = new ethers.providers.WebSocketProvider(configParams.INFURA_URL);
export const wallet = new ethers.Wallet(configParams.PRIVATE_KEY, provider);
