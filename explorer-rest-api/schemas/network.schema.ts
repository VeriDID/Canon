/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'peers' })
export class Network extends Document {

  @Prop([{
    version: String,
    name: String,
    network: {
      localAddress: String,
      remoteAddress: String,
    },
    port: String,
    id: String,
    protocols: {
      eth: {
        difficulty: String,
        head: String,
        version: Number,
      },
    },
    enode: String,
  }])
  peerInfo: Record<string, any>[];

}

export const NetworkSchema = SchemaFactory.createForClass(Network);
