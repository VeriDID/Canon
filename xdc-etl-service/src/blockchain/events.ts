import Web3 from 'web3';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

const contractABIPath = './contractABI.json';
let contractABI: any = [];

// Read the ABI from file
try {
    const rawdata = fs.readFileSync(contractABIPath, 'utf8');
    contractABI = JSON.parse(rawdata);
    //console.log("Test Point 1 contractABI", contractABI)
} catch (error) {
    console.error("Error reading ABI from file:", error);
}

// const contractABI = JSON.parse(process.env.CONTRACT_ABI || "[]");
const contractAddress = process.env.CONTRACT_ADDRESS;

console.log("contractAddress",contractAddress)

export async function subscribeToContractEvents(web3: Web3) {
    if (!contractABI.length || !contractAddress) {
        console.error("Please ensure CONTRACT_ABI and CONTRACT_ADDRESS are set in your .env file.");
        return;
    }

    const contract = new web3.eth.Contract(contractABI, contractAddress);
    console.log("contract",contract)

    // NYMRegistered event subscription
    const nymRegisteredSubscription = await contract.events.NYMRegistered();

    console.log("nymRegisteredSubscription",nymRegisteredSubscription)
    nymRegisteredSubscription
        .on('data', async (event: any) => {
            console.log("NYMRegistered event received:", event);
            await mongoose.connection.collection('NYMRegisteredEvents').insertOne(event);
        })
    nymRegisteredSubscription
        .on('error', (error: Error) => {
            console.error("Error with NYMRegistered event:", error);
        });

    // SchemaRegistered event subscription
    const schemaRegisteredSubscription = await contract.events.SchemaRegistered();

    console.log("schemaRegisteredSubscription",schemaRegisteredSubscription)
    schemaRegisteredSubscription
        .on('data', async (event: any) => {
            console.log("SchemaRegistered event received:", event);
            await mongoose.connection.collection('SchemaRegisteredEvents').insertOne(event);
        })
    schemaRegisteredSubscription
        .on('error', (error: Error) => {
            console.error("Error with SchemaRegistered event:", error);
        });

    // CredDefRegistered event subscription
    const credDefRegisteredSubscription = await contract.events.CredDefRegistered();

    console.log("credDefRegisteredSubscription",credDefRegisteredSubscription)
    credDefRegisteredSubscription
        .on('data', async (event: any) => {
            console.log("CredDefRegistered event received:", event);
            await mongoose.connection.collection('CredDefRegisteredEvents').insertOne(event);
        })

    credDefRegisteredSubscription
        .on('error', (error: Error) => {
            console.error("Error with CredDefRegistered event:", error);
        });


}
