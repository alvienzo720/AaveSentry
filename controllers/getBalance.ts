import { ethers } from "hardhat";
import "@nomiclabs/hardhat-ethers";
import { ABI } from "../ABI/ABI";
import { configParams, provider } from "../config/config";


export async function getBalanceLinkToken(token_address: any) {
    try {

        const wallet = new ethers.Wallet(configParams.PRIVATE_KEY, provider);
        const contract = new ethers.Contract(configParams.CONTRACT_ADDRESS, ABI, wallet);
        const balance = await contract.getBalance(token_address);
        const humanreadbleBalance = parseFloat(ethers.utils.formatEther(balance)).toFixed(2);

        return humanreadbleBalance;

    } catch (error) {
        console.log(error);

    }


}
