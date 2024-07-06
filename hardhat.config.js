require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/abYbqSnSW3fjpZ47TezEOToX_XaK285l`,
      accounts: [
        "cef9ff3373026c5bb549f3f99f287a91274f204ee8661982a7b1c2caeb917d75",
      ],
    },
  },
  paths: {
    artifacts: "./client/src/artifacts",
  },
};
