import { Module } from '@nestjs/common';
import { MySQLDBService } from './db.service';

@Module({
  providers: [MySQLDBService],
  exports: [MySQLDBService],
})
export class DBModule {}
