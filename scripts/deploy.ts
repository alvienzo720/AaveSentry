import { ethers } from "hardhat";
import "@nomiclabs/hardhat-ethers";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying MarketInteraction Contract with the account:", deployer.address);

  // We get the contract to deploy
  const MarketInteraction = await ethers.getContractFactory("MarketInteraction");
  const market = await MarketInteraction.deploy("0x0496275d34753A48320CA58103d5220d394FF77F");

  await market.deployed();

  console.log("MarketInteraction address:", market.address);
}



main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
