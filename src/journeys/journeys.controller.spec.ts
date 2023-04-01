import { Test, TestingModule } from '@nestjs/testing';
import { JourneysController } from './journeys.controller';
import { JourneysService } from './journeys.service';
import { PrismaService } from '../prisma.service';

describe('JourneysController', () => {
  let controller: JourneysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JourneysController],
      providers: [PrismaService, JourneysService],
    }).compile();

    controller = module.get<JourneysController>(JourneysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
