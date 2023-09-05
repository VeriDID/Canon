import { Test, TestingModule } from '@nestjs/testing';
import { AnoncredsService } from './anoncreds.service';

describe('AnoncredsService', () => {
  let service: AnoncredsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnoncredsService],
    }).compile();

    service = module.get<AnoncredsService>(AnoncredsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
