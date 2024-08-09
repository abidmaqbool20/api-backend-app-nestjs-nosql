// src/users/users.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Inject, ValidationPipe, UsePipes, UseGuards   } from '@nestjs/common'; 
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { GetDto } from './dto/get.dto';
import { DeleteDto } from './dto/delete.dto';
import { User } from './entities/user.entity';
import { CustomLoggerService } from '@/logger/logger.service'; // Adjust path as needed
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import * as jwt from 'jsonwebtoken';
import { ResponseService } from '@/global/response.service';


@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService, 
    @Inject(CustomLoggerService) private readonly logger: CustomLoggerService,
  ) {}



  //Create API 
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: User })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBody({ type: CreateDto })  
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body(new ValidationPipe({ transform: true, whitelist: true })) data: CreateDto) {
    try { 
      return await this.usersService.create(data);
    } catch (error) {
      this.logger.error(error, 'An error occurred while creating user');
      throw error; // Consider re-throwing or handling the error appropriately
    } 
  }



  //Get Listings API
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users', type: [User] })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBody({ type: GetDto })  
  async findAll() {
    try {  
      return await this.usersService.findAll();
    } catch (error) {
      this.logger.error(error, 'An error occurred while fetching all users');
      throw error; // Consider re-throwing or handling the error appropriately
    }
  }




  //Get single record
  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: String })
  @ApiBody({ type: GetDto })
  @ApiResponse({ status: 200, description: 'User found', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async findOne(@Param('id') id: string) {
    try {
      return await this.usersService.findOne(id);
    } catch (error) {
      this.logger.error(error, `An error occurred while fetching user with id ${id}`);
      throw error; // Consider re-throwing or handling the error appropriately
    }
  }




  //Update API 
  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: String })
  @ApiBody({ type: UpdateDto })
  @ApiResponse({ status: 200, description: 'User updated', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param('id') id: string, @Body() data: UpdateDto) {
    try { 
      return await this.usersService.update(id, data);
    } catch (error) {
      this.logger.error(error, `An error occurred while updating user with id ${id}`);
      throw error; // Consider re-throwing or handling the error appropriately
    }
  }






  //Delete API
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: String })
  @ApiBody({ type: DeleteDto })
  @ApiResponse({ status: 204, description: 'User deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async remove(@Param() params: DeleteDto) {
    const { id } = params;
    try {
      return await this.usersService.remove(id);
    } catch (error) {
      this.logger.error(error, `An error occurred while deleting user with id ${id}`);
      throw error; // Consider re-throwing or handling the error appropriately
    }
  }
}
