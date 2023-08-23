import { ethers } from "hardhat";

async function main() {
  try {
    const Utility = await ethers.getContractFactory("Utility");

    // Check if the contract factory was successfully retrieved
    if (!Utility) {
      throw new Error("Failed to get contract factory for Utility");
    }

    console.log("Deploying Utility contract...");

    const utilityContract: any = await Utility.deploy({
      gasLimit: 4000000, // Adjust the number as required
    });

    const Txreceipt = await utilityContract.deploymentTransaction().wait() // Wait for the transaction to be mined

    if (Txreceipt && Txreceipt.status === 0) {  // Check if the transaction failed
      throw new Error("Deployment transaction failed.");
    }

    console.log("Utility contract deployed at:", Txreceipt.contractAddress);
  } catch (error: any) {
    console.error("Error during deployment:", error.message);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
