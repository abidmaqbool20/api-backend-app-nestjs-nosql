import { Injectable, OnModuleInit  } from '@nestjs/common';  
import { User } from './entities/user.entity';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { UsersRepository } from './users.repository';
import { CacheService } from '@/cache/node.cache';
import {GeneralHelper} from '@/helpers/general.helper'  
import { CacheKeysService } from '@/global/cache-keys.service';

/**

This class can be used for the following purposes:
1 - Cache
2 - Functional Logs
3 - Cross Module Services Loading
4 - Data transformation
5 - Functional Level Access Management

**/


@Injectable()
export class UsersService implements OnModuleInit {   
  constructor(   
    private cacheKeysService: CacheKeysService,
    private readonly repository:UsersRepository, 
    private readonly cacheService: CacheService
  ) {}


  async onModuleInit() {   
    this.cacheKeysService = new CacheKeysService('users')
  }  

  //Create a record
  async create(data: CreateDto) {  
    return this.repository.create(data);
  }  

  //Fetch all listings
  async findAll() {
    let cacheKey = this.cacheKeysService.getCacheKeyByMethodName('findAll');
    if (!this.cacheService.has(cacheKey)) { 
      let result = this.repository.findAll();
      this.cacheService.set(cacheKey,result,36000); 
    }
    return  this.cacheService.get(cacheKey);
  } 


  //Find Single Record
  async findOne(id: string) {
    let cacheKey = this.cacheKeysService.getCacheKeyByMethodName('findOne',id);
    if (!this.cacheService.has(cacheKey)) { 
      let result = this.repository.findOne(id);
      this.cacheService.set(cacheKey,result,36000); 
    }
    return  this.cacheService.get(cacheKey); 
  } 


  //Update record
  async findByUsername(username: string) {  
    let cacheKey = this.cacheKeysService.getCacheKeyByMethodName('findByUsername',username);
    if (!this.cacheService.has(cacheKey)) { 
      let result = this.repository.findByUsername(username);
      this.cacheService.set(cacheKey,result,36000); 
    }
    return  this.cacheService.get(cacheKey);  
  }


  //Update record
  async update(id: string, userData: UpdateDto) { 
    let response = this.repository.update(id,userData);
    let cacheKey = this.cacheKeysService.getCacheKeyByMethodName('findOne',id); 
    this.cacheService.del(cacheKey);  
    return response;
  } 

  //Delete a record
  async remove(id: string) { 
    let response = this.repository.remove(id);
    let cacheKey = this.cacheKeysService.getCacheKeyByMethodName('findOne',id); 
    this.cacheService.del(cacheKey);  
    return response;
  }






}
