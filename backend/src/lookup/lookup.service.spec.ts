import { Test, TestingModule } from '@nestjs/testing';
import { LookupService } from './lookup.service';
import { GoogleService } from 'src/google/google.service';
import { StationsService } from 'src/stations/stations.service';
import { PrismaService } from 'src/prisma.service';

describe('LookupService', () => {
  let service: LookupService;

  const mockGoogleService = {
    autocomplete: jest.fn(),
    getCoordinates: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        LookupService,
        StationsService,
        { provide: GoogleService, useValue: mockGoogleService },
      ],
    }).compile();

    service = module.get<LookupService>(LookupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
