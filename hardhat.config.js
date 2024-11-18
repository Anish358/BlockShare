// hardhat.config.js
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const INFURA_API_KEY = process.env.VITE_INFURA_API_KEY;
const PRIVATE_KEY = process.env.VITE_PRIVATE_KEY;

module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  paths: {
    artifacts: "./frontend/src/artifacts",
  },
};
