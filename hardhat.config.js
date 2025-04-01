require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const USE_RESOLC = process.env.USE_RESOLC === 'true';
if (USE_RESOLC) {
  require("hardhat-resolc");
  require("hardhat-revive-node");
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      polkavm: true,
      nodeConfig: {
        nodeBinaryPath:
          "../../../code/polkadot-sdk/target/release/substrate-node",
        rpcPort: 8000,
        dev: true,
      },
      adapterConfig: {
        adapterBinaryPath:
          "../../../code/polkadot-sdk/target/release/eth-rpc",
        dev: true,
      },
    },
    localNode: {
      polkavm: true,
      url: `http://127.0.0.1:8545`,
      accounts: [process.env.LOCAL_PRIV_KEY, process.env.AH_PRIV_KEY],
    },
    westendAssetHub: {
      polkavm: true,
      url: "https://westend-asset-hub-eth-rpc.polkadot.io",
      accounts: [process.env.AH_PRIV_KEY, process.env.LOCAL_PRIV_KEY],
    },

    sepolia: {
      url: "https://eth-sepolia.public.blastapi.io",
      accounts: [process.env.LOCAL_PRIV_KEY],
     },

     moonbase: {
      url: 'https://rpc.moonbase.moonbeam.network',
      accounts: [process.env.LOCAL_PRIV_KEY],
    },
  },

  ...(USE_RESOLC ? {
    resolc: {
      compilerSource: 'binary',
      settings: {
        optimizer: {
          enabled: true,
          runs: 400,
        },
        evmVersion: 'istanbul',
        compilerPath: '~/.cargo/bin/resolc',
        standardJson: true,
      },
    },
  } : {})
};
