import { ethers } from "hardhat";
import "@nomiclabs/hardhat-ethers";
import { ABI } from "../ABI/ABI";
import { configParams, wallet } from "../config/config";
import { getBalanceLinkToken } from "./getBalance";
import cron from "node-cron";


export async function supplyLiquidity(token_address: string, amount: any) {
    try {
        const contract = new ethers.Contract(configParams.CONTRACT_ADDRESS, ABI, wallet);
        const supply = contract.supplyLiquidity(token_address, amount);
        let tx = await supply;
        let message = `You supplied liquidity of a  Token worth ${ethers.utils.formatEther(amount)}\n`
        message += `\n View Transaction: https://sepolia.etherscan.io/tx/${tx.hash}\n`
        return message
    } catch (error) {
        console.log(error);
    }
}



export function getPNL(onPNLCalculated: (pnl: number) => void) {
    // Schedule this function to run every 20 seconds
    cron.schedule('*/20 * * * * *', async () => {
        try {
            let tokenSupplied: any = await getBalanceLinkToken(configParams.LINK_ADDRESS);
            let tokenOut: any = await getBalanceLinkToken(configParams.aLINK_ADDRESS);
            const result = tokenOut - tokenSupplied;
            // console.log('Result: ',result)
            onPNLCalculated(result);
        } catch (error) {
            console.log(error);
        }
    });
}





