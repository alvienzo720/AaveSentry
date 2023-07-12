import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: "0.8.10",
  networks: {
    sepolia: {
      url: process.env.INFURA_SEPOLIA_HTTP,
      accounts: [String(process.env.PRIVATE_KEY)],
    },
  },
};

export default config;
