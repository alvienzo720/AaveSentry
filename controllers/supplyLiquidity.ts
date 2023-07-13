import { ethers } from "hardhat";
import "@nomiclabs/hardhat-ethers";
import { ABI } from "../ABI/ABI";
import { configParams, wallet } from "../config/config";


export async function supplyLiquidity(token_address: string, amount: any) {
    try {
        const contract = new ethers.Contract(configParams.CONTRACT_ADDRESS, ABI, wallet);
        const supply = contract.supplyLiquidity(token_address, amount);
       let tx =  await supply;
       let message = `You supplied liquidity of a  Token worth ${ethers.utils.formatEther(amount)}\n`
        message += `\n View Transaction: https://sepolia.etherscan.io/tx/${tx.hash}\n`
       return message

    } catch (error) {
        console.log(error);

    }

}
