const hre = require("hardhat");

const { SchemaRegistry } = require("@ethereum-attestation-service/eas-sdk");

const schemaRegistryContractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const EASContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

// create schema
async function main() {
  const [signer0] = await hre.ethers.getSigners();

  const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);
  schemaRegistry.connect(signer0);

  const schema = "uint256 eventId, uint8 voteIndex";
  const revocable = false;

  const transaction = await schemaRegistry.register({
    schema,
    revocable,
  });

  const schemaUID = await transaction.wait();
  console.log("schemaUID: ", schemaUID);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
