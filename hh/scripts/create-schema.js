const hre = require("hardhat");

const { SchemaRegistry } = require("@ethereum-attestation-service/eas-sdk");

const schemaRegistryContractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const EASContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

// create schema
async function main() {
  const [signer0] = await hre.ethers.getSigners();
  //   console.log(signer0);

  const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);
  schemaRegistry.connect(signer0);

  const schema = "uint128 eventId, uint8 voteIndex";
  // Unused
  //   const resolverAddress = "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0"; // Sepolia 0.26
  const revocable = false;

  const transaction = await schemaRegistry.register({
    schema,
    revocable,
  });

  const waited = await transaction.wait();
  console.log(waited);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
