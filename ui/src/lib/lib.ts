import { EAS, SchemaEncoder, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";

const schemaRegistryContractAddress = "0x87D7b574102068Ca27Ea9F725f7Ae800440bB2Fe";
const EASContractAddress = "0xAC9FE4757367cCc875A990B41cA3C377763f5c37";

async function createMatchResultSchema(signer: ethers.Signer) {
  const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);
  schemaRegistry.connect(signer);

  // Schema UID 0xaa66761eb308a654213d221c7e9d170d854a6fb5be1d3dc4c2a1264ce4a484df
  const schema = "uint32 sportId, uint32 matchId, uint32 team1Id, uint32 team2Id, uint8 team1Score, uint8 team2Score";
  const revocable = false;

  const transaction = await schemaRegistry.register({
    schema,
    revocable,
  });

  const schemaUID = await transaction.wait();
  console.log("schemaUID: ", schemaUID);

  return schemaUID;
}

interface IAttestMatchScoreParams {
  schemaUID: string;
  sportId: number;
  matchId: number;
  team1Id: number;
  team2Id: number;
  team1Score: number;
  team2Score: number;
}

// onchain attestation
async function attestMatchScore(signer: ethers.Signer, attestParams: IAttestMatchScoreParams) {
  const eas = new EAS(EASContractAddress);
  eas.connect(signer);

  const schemaEncoder = new SchemaEncoder(
    "uint32 sportId, uint32 matchId, uint32 team1Id, uint32 team2Id, uint8 team1Score, uint8 team2Score",
  );

  const encodedData = schemaEncoder.encodeData([
    { name: "sportId", value: attestParams.sportId, type: "uint32" },
    { name: "matchId", value: attestParams.matchId, type: "uint32" },
    { name: "team1Id", value: attestParams.team1Id, type: "uint32" },
    { name: "team2Id", value: attestParams.team2Id, type: "uint32" },
    { name: "team1Score", value: attestParams.team1Score, type: "uint8" },
    { name: "team2Score", value: attestParams.team2Score, type: "uint8" },
  ]);

  // const schemaUID = "0x484546d0f8604f0e1caf23af2e4440db22a7746d1a455a12d1242b3041666b3c";
  const tx = await eas.attest({
    schema: attestParams.schemaUID,
    data: {
      recipient: "0x6f238419Af7593B3a2A451e5Dcd47576E6355Cd4",
      expirationTime: 0n,
      revocable: false, // Be aware that if your schema is not revocable, this MUST be false
      data: encodedData,
    },
  });

  const newAttestationUID = await tx.wait();

  console.log("New attestation UID:", newAttestationUID);

  return newAttestationUID;
}

export { createMatchResultSchema, attestMatchScore };
