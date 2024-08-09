import { CreateDto } from '../dto/create.dto';
import { v4 as uuidv4 } from 'uuid';
import {GeneralHelper} from '@/helpers/general.helper'
export class User {
	
	id: string;
  	name: string;
  	email: string;
  	password: string;
  	created_at: Date;
  	updated_at: Date;

  	static async newInstanceFromDTO(data: CreateDto): Promise<User> {
	    let result = new User();
	    result.id = await GeneralHelper.getUUID();  
	    result.name = data.name;
	    result.email = data.email;
	    result.password = data.password; 
	    result.created_at = data.created_at || new Date();  
	    result.updated_at = new Date(); // Set to now
	    return result;
  	}

   	static async newInstanceFromDDBObject(data: any): Promise<User> {
	    const result = new User();
	    result.id = data.id ? data.id.S : null;
	    result.name = data.name ? data.name.S : null;
	    result.email = data.email ? data.email.S : null;
	    result.password = data.password ? data.password.S : null ;
	    result.created_at = data.created_at ? new Date(Number(data.created_at.N)) : null;
	    result.updated_at = data.updated_at ? new Date(Number(data.updated_at.N)) : null;
	    return result;
  	}
}
