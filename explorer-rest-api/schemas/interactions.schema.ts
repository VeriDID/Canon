/* eslint-disable prettier/prettier */
import { Schema } from 'mongoose';

// Define the schema for the 'data' subdocument in the 'event' field
const eventDataSchema = new Schema({
    account: String,
    role: Number,
    version: Number,
    endpoint: String,
    schemaID: String,
    name: String,
    credDefID: String,
    tag: String,
}, { _id: false });  // Disable automatic '_id' for subdocument

// Define the schema for the 'event' field
const eventSchema = new Schema({
    eventName: String,
    data: eventDataSchema,
}, { _id: false });  // Disable automatic '_id' for subdocument

// Define the main schema for the 'interactions' collection
const InteractionsSchema = new Schema({
    status: String,
    transactionHash: String,
    contractAddress: String,
    event: eventSchema,
}, { collection: 'interactions' });

export { InteractionsSchema };
