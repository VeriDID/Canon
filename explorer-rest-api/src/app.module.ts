/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Import schemas
import { InteractionsSchema } from '../schemas/interactions.schema'
import { BlocksSchema } from '../schemas/recentblocknumber.schema';
import { ContractsSchema } from '../schemas/contracts.schema';
import { NetworkSchema } from '../schemas/network.schema';

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/canon';


@Module({
  imports: [
    MongooseModule.forRoot(mongoUri),
    MongooseModule.forFeature([
      { name: 'Interaction', schema: InteractionsSchema },
      { name: 'Block', schema: BlocksSchema },
      { name: 'Contract', schema: ContractsSchema },
      { name: 'Network', schema: NetworkSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
