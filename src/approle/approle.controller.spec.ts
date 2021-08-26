import { Test, TestingModule } from '@nestjs/testing';
import { ApproleController } from '../Routes/approle.controller';

describe('ApproleController', () => {
  let controller: ApproleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApproleController],
    }).compile();

    controller = module.get<ApproleController>(ApproleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
