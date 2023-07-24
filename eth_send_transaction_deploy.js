const fs = require("fs");
const path = require("path");
const Web3 = require("web3");
const Tx = require("ethereumjs-tx").Transaction;

// Define the provider URL
const host = "http://127.0.0.1:8545"; // Replace with the correct provider URL

async function main() {
  const web3 = new Web3(host);

  // Use an existing account, or create an account (for simplicity, we use the same private key from the previous example)
  const privateKey =
    "0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63";
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);

  // Read in the compiled Utility contract
  const contractJsonPath = path.resolve(__dirname, "Utility.json");
  const contractJson = JSON.parse(fs.readFileSync(contractJsonPath));
  const contractAbi = contractJson.abi;
  const contractBin = contractJson.bytecode;
  // Initialize the default constructor with the appropriate value (no need to append this to the bytecode)

  // Get the nonce value for the transaction count
  const txnCount = await web3.eth.getTransactionCount(account.address);

  const contractInitData = ""; // Modify this with the correct constructor arguments, if any

  const rawTxOptions = {
    nonce: web3.utils.numberToHex(txnCount),
    from: account.address,
    to: null, // Public tx (since it's a contract deployment)
    value: "0x00",
    data: "0x" + contractBin + contractInitData, // Contract bytecode appended with initialization data
    gasPrice: "0x0", // ETH per unit of gas
    gasLimit: "0x24A22", // Max number of gas units the tx is allowed to use
  };

  console.log("Creating transaction...");
  const tx = new Tx(rawTxOptions);
  console.log("Signing transaction...");
  tx.sign(Buffer.from(privateKey.slice(2), "hex"));
  console.log("Sending transaction...");
  var serializedTx = tx.serialize();
  const pTx = await web3.eth.sendSignedTransaction(
    "0x" + serializedTx.toString("hex")
  );
  console.log("tx transactionHash: " + pTx.transactionHash);
  console.log("tx contractAddress: " + pTx.contractAddress);
}

main().catch((err) => console.error(err));
