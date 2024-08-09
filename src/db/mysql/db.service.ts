import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createConnection, Connection } from 'mysql2/promise';
import * as dotenv from 'dotenv';
import { DatabaseService } from '@/db/db.service.interface';
dotenv.config();

@Injectable()
export class MySQLDBService implements DatabaseService, OnModuleInit, OnModuleDestroy {
  public connection: Connection;

  async onModuleInit() {
    this.connection = await createConnection({
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'test',
    });
  }

  async onModuleDestroy() {
    if (this.connection) {
      await this.connection.end();
    }
  }

  async query(query: string, params?: any[]) {
    const [results] = await this.connection.execute(query, params);
    return results;
  }

  async putItem(query: string, params: any[]) {
  		if (!this.connection) {
	    	throw new Error('Database connection is not established.');
	  	}
    const [result] = await this.connection.execute(query, params);
    return result;
  }

  async getItem(query: string, params: any[]) {
    const [result] = await this.connection.execute(query, params);
    return result;
  }

  async getItems(query: string) {
    const [results] = await this.connection.query(query);
    return results;
  }

  async patchItem(query: string, params: any[]) {
    const [result] = await this.connection.execute(query, params);
    return result;
  }

  async deleteItem(query: string, params: any[]) {
    const [result] = await this.connection.execute(query, params);
    return result;
  }
}
