import { Injectable, OnModuleInit } from '@nestjs/common';
import { DynamoDBClient, PutItemCommand, GetItemCommand, ScanCommand, UpdateItemCommand,DeleteItemCommand } from '@aws-sdk/client-dynamodb';
import * as dotenv from 'dotenv';
import { DatabaseService } from '@/db/db.service.interface';
dotenv.config();

@Injectable()
export class DynamoDBService implements DatabaseService {
  	public client: DynamoDBClient;

	constructor() {
	    this.client = new DynamoDBClient({
	      region: process.env.AWS_REGION,
	      credentials: {
	        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	      },
	    }); 
	} 

	async query(query, params) {
		return this.client.send(new ScanCommand(query));
	}
 	async putItem(params: any) {
    	return this.client.send(new PutItemCommand(params));
  	}

  	async getItem(params: any) {
    	return this.client.send(new GetItemCommand(params));
  	}

  	async getItems(params?: any) {
    	return this.client.send(new ScanCommand(params));
  	}

  	async patchItem(params: any) {
    	return this.client.send(new UpdateItemCommand(params));
  	}

  	async deleteItem(params: any) {
    	return this.client.send(new DeleteItemCommand(params));
  	}
 
}
