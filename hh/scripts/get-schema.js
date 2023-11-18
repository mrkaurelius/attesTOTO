const hre = require("hardhat");

const { SchemaRegistry } = require("@ethereum-attestation-service/eas-sdk");

const chilizRegistryAddress = "0x87D7b574102068Ca27Ea9F725f7Ae800440bB2Fe";
const localRegistryAddress  = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
// const EASContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

// create schema
async function main() {
  // const schemaRegistryContractAddress = "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0"; // Sepolia 0.26
  //   const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);
  const [signer0] = await hre.ethers.getSigners();
  const schemaRegistry = new SchemaRegistry(chilizRegistryAddress);
  schemaRegistry.connect(signer0);
  const schemaUID = "0x3f1bd9d1ee5d581056f6492e0bb46243b727a2c9b0e75a64adec8d5efe2dd92c";

  const schemaRecord = await schemaRegistry.getSchema({ uid: schemaUID });

  console.log(schemaRecord);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
