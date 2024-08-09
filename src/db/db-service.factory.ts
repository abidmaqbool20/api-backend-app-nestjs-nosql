import { DatabaseService } from './db.service.interface';
import { DynamoDBService } from './dynamodb/db.service';
import { MySQLDBService } from './mysql/db.service';
// Import other database services if necessary

export class DatabaseServiceFactory {
  static async createService(): Promise<DatabaseService> {
    const activeDB = process.env.ACTIVE_DB || 'dynamodb';  

    if (activeDB === 'dynamodb') {
      return new DynamoDBService();
    }else if (activeDB === 'mysql') {
      return new MySQLDBService();
    }
     

    throw new Error(`Unsupported database type: ${activeDB}`);
  }
}
