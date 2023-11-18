const hre = require("hardhat");

const { SchemaRegistry } = require("@ethereum-attestation-service/eas-sdk");

// const chilizRegistryAddress = "0x87D7b574102068Ca27Ea9F725f7Ae800440bB2Fe";
const localRegistryAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

// create schema
async function main() {
  const [signer0] = await hre.ethers.getSigners();

  const schemaRegistry = new SchemaRegistry(localRegistryAddress);

  schemaRegistry.connect(signer0);

  const schemaUID = "0x484546d0f8604f0e1caf23af2e4440db22a7746d1a455a12d1242b3041666b3c";
  const schemaRecord = await schemaRegistry.getSchema({ uid: schemaUID });

  console.log(schemaRecord);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
