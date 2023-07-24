// index.js

require('dotenv').config();
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");



// Continue with the rest of your application code
const Web3 = require("web3");
const EEAClient = require("web3-eea");

const bytecode = "..."; // Contract bytecode
const contractConstructorInit = "..."; // Constructor initialization value

const web3 = new Web3(clientUrl);
const web3eea = new EEAClient(web3, 1337);

const txOptions = {
  data: "0x" + bytecode + contractConstructorInit,
  privateKey: process.env.PRIVATE_KEY,
  privateFrom: process.env.FROM_PUBLIC_KEY,
  privateFor: [process.env.TO_PUBLIC_KEY],
};

console.log("Creating contract...");
const txHash = await web3eea.eea.sendRawTransaction(txOptions);
console.log("Getting contractAddress from txHash: ", txHash);

const privateTxReceipt = await web3.priv.getTransactionReceipt(
  txHash,
  process.env.FROM_PUBLIC_KEY,
);
console.log("Private Transaction Receipt: ", privateTxReceipt);
