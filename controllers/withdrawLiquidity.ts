import { ethers } from "hardhat";
import "@nomiclabs/hardhat-ethers";
import { ABI } from "../ABI/ABI";
import { configParams, wallet } from "../config/config";


export async function withdrawlLiquidity(token_address: string) {
    try {
        const contract = new ethers.Contract(configParams.CONTRACT_ADDRESS, ABI, wallet);
        let withdraw_token = await contract.withdraw(token_address);
        let tx = await withdraw_token;
        let message = `You withdrew All the Liquidity  of the Token you provided\n`
        message += `\n View Transaction: https://sepolia.etherscan.io/tx/${tx.hash}\n`
        return message
    } catch (error) {
        console.log(error);

    }

}
