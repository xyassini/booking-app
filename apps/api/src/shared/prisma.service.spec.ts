import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';
import { INestApplication } from '@nestjs/common';

describe('PrismaService', () => {
  let service: PrismaService;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
    app = module.createNestApplication();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('should connect to the database', async () => {
      jest.spyOn(service, '$connect').mockImplementation(() => Promise.resolve());
      await service.onModuleInit();
      expect(service.$connect).toHaveBeenCalled();
    });
  });

  describe('enableShutdownHooks', () => {
    xit('should close the app on beforeExit event', async () => {
      jest.spyOn(app, 'close').mockImplementation(() => Promise.resolve());
      await service.enableShutdownHooks(app).then(service.$disconnect.bind(service));
      expect(app.close).toHaveBeenCalled();
    });
  });
});
