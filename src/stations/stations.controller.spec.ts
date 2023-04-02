import { Test, TestingModule } from '@nestjs/testing';
import { StationsController } from './stations.controller';
import { StationsService } from './stations.service';
import { PrismaService } from 'src/prisma.service';

describe('StationsController', () => {
  let controller: StationsController;
  let service: StationsService;

  const baseStationsQuery = { page: undefined, name: undefined };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StationsController],
      providers: [
        PrismaService,
        {
          provide: StationsService,
          useValue: {
            findMany: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<StationsController>(StationsController);
    service = module.get<StationsService>(StationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call the service when provided with valid query', async () => {
      await controller.findAll(baseStationsQuery);
      expect(service.findMany).toHaveBeenCalledWith({});

      await controller.findAll({ page: 20, name: 'Test' });
      expect(service.findMany).toHaveBeenCalledWith({ page: 20, name: 'Test' });
    });
  });

  describe('findOne', () => {
    it('should call the service when provided with id', async () => {
      await controller.findOne(1);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });
});
