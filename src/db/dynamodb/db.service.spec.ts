import { Test, TestingModule } from '@nestjs/testing';
import { DynamodbService } from './db.service';

describe('DynamodbService', () => {
  let service: DynamodbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DynamodbService],
    }).compile();

    service = module.get<DynamodbService>(DynamodbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
