import { Injectable, NotFoundException, BadRequestException, OnModuleInit  } from '@nestjs/common'; 
import { DatabaseService } from '@/db/db.service.interface';
import { DatabaseServiceFactory } from '@/db/db-service.factory';
import { User } from './entities/user.entity';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { CustomLoggerService } from '@/logger/logger.service';
import { GeneralHelper } from '@/helpers/general.helper'  


@Injectable()
export class UsersRepository implements OnModuleInit {
  private readonly tableName = 'users';  
  private dbService: DatabaseService;
  
  constructor(  
    private readonly logger: CustomLoggerService, 
  ) {}


  async onModuleInit() {
    this.dbService = await DatabaseServiceFactory.createService(); 
  }



  //Create a record
  async create(data: CreateDto) {  
    data.password = await GeneralHelper.encrypt(data.password, 'bcrypt');  
    let userData : CreateDto = await User.newInstanceFromDTO(data); 
    const record: Record<string, AttributeValue> = {
      id: { S: userData.id },
      name: { S: userData.name },
      email: { S: userData.email },
      password: { S: userData.password },
      created_at: { N: userData.created_at.getTime().toString() },
      updated_at: null,  
    };

    const params = {
      TableName: this.tableName,
      Item: record,
    };  
    return this.dbService.putItem( params );
  }






  //Fetch all listings
  async findAll() { 
    const params = {
      TableName: this.tableName,
    };
 
    const result : User[] = [];
    const response = await this.dbService.getItems( params );
    if(response.Items){
      response.Items.forEach(async (item) => {
        result.push(await User.newInstanceFromDDBObject(item));
      })
    }
    return result;
  }






  //Find Single Record
  async findOne(id: string) {
    const params = {
      TableName: this.tableName,
      Key: {
        id: { S: id },
      },
    }; 

    const data = await this.dbService.getItem( params );
    if (!data.Item) {
      throw new NotFoundException('Record not found'); 
    }
    return data.Item;
  }


   //Find Single Record
  async findByUsername(username: string) { 
    const params = {
      TableName: this.tableName,
      FilterExpression: '#email = :emailValue',
      ExpressionAttributeNames: {
        '#email': 'email',
      },
      ExpressionAttributeValues: {
        ':emailValue': { S: username },
      },
    };
     
    try {
      const data = await this.dbService.getItems(params); 
      if (!data.Items || data.Items.length === 0) {
        throw new NotFoundException('Record not found');
      }

      return data.Items[0];
    } catch (error) {
      console.error('Error during DynamoDB Scan:', error);
      throw error;
    }
  }
  


  //Update record
  async update(id: string, userData: UpdateDto) { 
    const existingRecordResponse = await this.findOne(id);
    if (!existingRecordResponse.Item) {
      throw new NotFoundException('Record not found'); 
    }

    
    const existingRecord = await User.newInstanceFromDDBObject(existingRecordResponse); 
   
    const updateParams: Record<string, AttributeValue> = {
      id: { S: existingRecord.id },
        email: { S: existingRecord.email },
        updated_at: { N: new Date().getTime().toString() },
      };

      if (userData.name) {
        updateParams.name = { S: userData.name };
      }
      if (userData.email) {
        updateParams.email = { S: userData.email };
      }
      if (userData.password) {
        updateParams.password = { S: userData.password };
      }

      // Prepare the DynamoDB update parameters
      const params = {
        TableName: this.tableName,
        Item: updateParams,
      };

      // Perform the update operation
      return this.dbService.putItem(params);
  }







  //Delete a record
  async remove(id: string) {

    const existingRecordResponse = await this.findOne(id);
    if (!existingRecordResponse.Item) {
      throw new NotFoundException('Record not found'); 
    }


    const params = {
      TableName: this.tableName,
      Key: {
        id: { S: id },
      },
    }; 

    return this.dbService.deleteItem(params);
  }






}
