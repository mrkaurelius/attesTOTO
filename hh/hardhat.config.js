require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  // solidity: "0.8.19",
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  allowUnlimitedContractSize: true,
  networks: {
    hardhat: {},
    chiliz: {
      url: "https://rpc.ankr.com/chiliz",
      // accounts: ["901badfd5e18fa07793c9c460da586ec27758946f20039c99402d4abe1704b2b"], // :)
    },
  },
};
