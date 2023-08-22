/* eslint-disable prettier/prettier */
import { Schema } from 'mongoose';

export const BlocksSchema = new Schema({
  recentBlockNumber: Number,

}, { collection: 'recentblocknumber' });
