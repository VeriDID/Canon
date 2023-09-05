import { Test, TestingModule } from '@nestjs/testing';
import { AnoncredsController } from './anoncreds.controller';

describe('AnoncredsController', () => {
  let controller: AnoncredsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnoncredsController],
    }).compile();

    controller = module.get<AnoncredsController>(AnoncredsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
