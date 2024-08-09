import { Module } from '@nestjs/common';
import { DynamoDBService } from './db.service';

@Module({
  providers: [DynamoDBService],
  exports: [DynamoDBService],
})
export class DBModule {}
