// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

// Deploy registry and EAS
async function main() {
  const SR = await ethers.getContractFactory("SchemaRegistry");
  const sr = await SR.deploy();

  await sr.waitForDeployment();

  console.log("SchemaRegistry contractAddress: ", await sr.getAddress());
  const schemaRegistryAddress = await sr.getAddress();

  const EASF = await ethers.getContractFactory("EAS");
  const easc = await EASF.deploy(schemaRegistryAddress);
  const EASContractAddress = await easc.getAddress();
  console.log("EAS contractAddress: ", EASContractAddress);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
