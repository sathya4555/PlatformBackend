import { Test, TestingModule } from '@nestjs/testing';
import { ApproleService } from '../approle/approle.service';

describe('ApproleService', () => {
  let service: ApproleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApproleService],
    }).compile();

    service = module.get<ApproleService>(ApproleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
