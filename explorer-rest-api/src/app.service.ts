/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Interaction') private InteractionsModel: Model<any>,
    @InjectModel('Block') private blockModel: Model<any>,
    @InjectModel('Contract') private contractModel: Model<any>,
    @InjectModel('Network') private networkModel: Model<any>
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async getCredDefRegisteredEvents(): Promise<any[]> {
    return this.InteractionsModel.find({'event.eventName': 'CredDefRegistered'}).exec();
  }
  
  async getSchemaRegisteredEvents(): Promise<any[]> {
    return this.InteractionsModel.find({'event.eventName': 'SchemaRegistered'}).exec();
  }
  
  async getNYMRegisteredEvents(): Promise<any[]> {
    return this.InteractionsModel.find({'event.eventName': 'NYMRegistered'}).exec();
  }

  async getInteractions(): Promise<any[]> {
    return this.InteractionsModel.find().exec();
  }

  async getBlockNumber(): Promise<any[]> {
    return this.blockModel.find().exec();
  }

  async getContracts(): Promise<any[]> {
    return this.contractModel.find().exec();
  }

  async getPeers(): Promise<any[]> {
    return this.networkModel.find().exec();
  }
}
