const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const UniswapToken = await hre.ethers.getContractFactory("UniswapV2ERC20");
  const uniswapToken = await UniswapToken.deploy();
  await uniswapToken.waitForDeployment();
  const UniswapTokenAddress = await uniswapToken.getAddress();
  console.log("UniswapToken deployed to:", UniswapTokenAddress);

  const TizunToken = await hre.ethers.getContractFactory("TizunERC20");
  const tizunToken = await TizunToken.deploy();
  await tizunToken.waitForDeployment();
  const TizunTokenAddress = await tizunToken.getAddress();
  console.log("TizunToken deployed to:", TizunTokenAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});