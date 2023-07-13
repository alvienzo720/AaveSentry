import { ethers } from "hardhat";
import "@nomiclabs/hardhat-ethers";
import { ABI } from "../ABI/ABI";
import { configParams, wallet } from "../config/config";


export async function withdrawlLiquidity(token_address: string, amount: any) {
    try {
        const contract = new ethers.Contract(configParams.CONTRACT_ADDRESS, ABI, wallet);
        let withdraw_token = await contract.withdrawlLiquidity(token_address, amount);
        let tx = await withdraw_token;
        let message = `You withdrew liquidity of a  Token worth ${ethers.utils.formatEther(amount)}\n`
        message += `\n View Transaction: https://sepolia.etherscan.io/tx/${tx.hash}\n`
        return message
    } catch (error) {
        console.log(error);

    }

}
