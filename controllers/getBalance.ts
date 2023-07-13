import { ethers } from "hardhat";
import "@nomiclabs/hardhat-ethers";
import { ABI } from "../ABI/ABI";
import { configParams, provider, wallet } from "../config/config";


export async function getBalanceLinkToken(token_address: any) {
    try {

        
        const contract = new ethers.Contract(configParams.CONTRACT_ADDRESS, ABI, wallet);
        const balance = await contract.getBalance(token_address);
        const humanreadbleBalance = parseFloat(ethers.utils.formatEther(balance));

        return humanreadbleBalance;

    } catch (error) {
        console.log(error);

    }


}


