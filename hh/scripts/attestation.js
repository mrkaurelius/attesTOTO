const hre = require("hardhat");

const { SchemaRegistry, SchemaEncoder, EAS } = require("@ethereum-attestation-service/eas-sdk");

const schemaRegistryContractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const EASContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

async function offChainAttest() {
  const [signer0] = await hre.ethers.getSigners();

  const eas = new EAS(EASContractAddress);
  eas.connect(signer0);

  const offchain = await eas.getOffchain();

  const schemaEncoder = new SchemaEncoder("uint256 eventId, uint8 voteIndex");
  const encodedData = schemaEncoder.encodeData([
    { name: "eventId", value: 1, type: "uint256" },
    { name: "voteIndex", value: 1, type: "uint8" },
  ]);

  const offchainAttestation = await offchain.signOffchainAttestation(
    {
      recipient: "0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165",
      // Unix timestamp of when attestation expires. (0 for no expiration)
      expirationTime: 0,
      // Unix timestamp of current time
      time: 1671219636,
      revocable: true, // Be aware that if your schema is not revocable, this MUST be false
      version: 1,
      nonce: 0,
      schema: "0xb16fa048b0d597f5a821747eba64efa4762ee5143e9a80600d0005386edfc995",
      refUID: "0x0000000000000000000000000000000000000000000000000000000000000000",
      data: encodedData,
    },
    signer0
  );

  console.log(offchainAttestation);
}

async function onChainAttest() {
  const [signer0] = await hre.ethers.getSigners();

  const eas = new EAS(EASContractAddress);
  eas.connect(signer0);

  const schemaEncoder = new SchemaEncoder("uint256 eventId, uint8 voteIndex");
  const encodedData = schemaEncoder.encodeData([
    { name: "eventId", value: 1, type: "uint256" },
    { name: "voteIndex", value: 1, type: "uint8" },
  ]);

  const schemaUID = "0x484546d0f8604f0e1caf23af2e4440db22a7746d1a455a12d1242b3041666b3c";

  const tx = await eas.attest({
    schema: schemaUID,
    data: {
      recipient: "0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165",
      expirationTime: 0,
      revocable: false, // Be aware that if your schema is not revocable, this MUST be false
      data: encodedData,
    },
  });

  const newAttestationUID = await tx.wait();

  console.log("New attestation UID:", newAttestationUID);

  const attestation = await eas.getAttestation(newAttestationUID);

  console.log(attestation);

  const decodedAttestation = schemaEncoder.decodeData(attestation.data);
  console.log(decodedAttestation);
}

// create schema
async function main() {
  //   offChainAttest();
  onChainAttest();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
