require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { GOERLI_API_URL, MAINNET_API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } =
  process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "goerli",
  networks: {
    goerli: {
      url: GOERLI_API_URL ?? "",
      accounts: [`0x${PRIVATE_KEY}`],
    },
    mainnet: {
      url: MAINNET_API_URL ?? "",
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: {
      goerli: ETHERSCAN_API_KEY ?? "",
      mainnet: ETHERSCAN_API_KEY ?? "",
    },
  },
};
