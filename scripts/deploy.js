// scripts/deploy.js
async function main() {
  try {
    // Get the contract factory
    const SecureChat = await ethers.getContractFactory("SecureChat");

    // Deploy the contract
    console.log("Deploying DataShare...");
    const secureChat = await SecureChat.deploy();

    // Wait for the deployment transaction to be mined
    await secureChat.waitForDeployment();

    // Get the deployed contract address
    const deployedAddress = await secureChat.getAddress();
    console.log("SecureChat deployed to:", deployedAddress);

    // Optional: Verify on Etherscan (if you have API key set up)
    console.log("Waiting for block confirmations...");
    await secureChat.deploymentTransaction().wait(5);

    console.log("Contract deployment completed!");
    console.log("-----------------------------------");
    console.log("Contract Address:", deployedAddress);
    console.log("-----------------------------------");
  } catch (error) {
    console.error("Error during deployment:", error);
    process.exitCode = 1;
  }
}

// Execute deployment
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
