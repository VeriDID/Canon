import { Schema } from 'mongoose';

export const ContractsSchema = new Schema({
  contractAddress: String,
  transactionHash: String,
});
