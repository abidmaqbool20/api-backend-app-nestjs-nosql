import { Test, TestingModule } from '@nestjs/testing';
import { MySQLDBService } from './db.service';

describe('MySQLDBService', () => {
  let service: mySQLDBService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MySQLDBService],
    }).compile();

    service = module.get<mySQLDBService>(MySQLDBService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
