require("@nomicfoundation/hardhat-toolbox");

require("hardhat-revive-node");
require("dotenv").config();

if (process.env.POLKAVM) {
  require("hardhat-resolc");
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  ...(process.env.POLKAVM && {
    resolc: {
      compilerSource: "binary",
      settings: {
        optimizer: {
          enabled: true,
          runs: 400,
        },
        evmVersion: "istanbul",
        compilerPath: "/Users/nhussein11/Downloads/resolc-universal-apple-darwin",
        standardJson: true,
      },
    },
  }),
  networks: {
    hardhat: {
      polkavm: process.env.POLKAVM ? true : false,
      nodeConfig: {
        nodeBinaryPath:
          "/Users/nhussein11/Documents/workspace/papermoon/polkadot-stable2412-2/target/release/substrate-node",
        rpcPort: 8000,
        dev: true,
      },
      adapterConfig: {
        adapterBinaryPath:
          "/Users/nhussein11/Documents/workspace/papermoon/polkadot-stable2412-2/target/release/eth-rpc",
        dev: true,
      },
    },
    localNode: {
      polkavm: true,
      url: `http://127.0.0.1:8545`,
      accounts: [process.env.LOCAL_PRIVATE_KEY, process.env.LOCAL_PRIVATE_KEY_2],
    },
    westendAssetHub: {
      polkavm: true,
      url: "https://westend-asset-hub-eth-rpc.polkadot.io",
      accounts: [process.env.WESTEND_PRIVATE_KEY],
    },
    sepolia: {
      url: "https://eth-sepolia.public.blastapi.io",
      accounts: [process.env.WESTEND_PRIVATE_KEY],
    },
  },
};