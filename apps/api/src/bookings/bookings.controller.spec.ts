import {Test, TestingModule} from '@nestjs/testing';
import {BookingsController} from './bookings.controller';
import {BookingsService} from './bookings.service';
import {bookingsMockArray, bookingsMockCreate} from "./bookings.mock";
import {PrismaService} from "../shared/prisma.service";

describe('Bookings Controller', () => {
  let controller: BookingsController;
  let service: BookingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingsController],
      providers: [PrismaService, BookingsService],
    }).compile();

    controller = module.get<BookingsController>(BookingsController);
    service = module.get<BookingsService>(BookingsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of bookings', async () => {
      const result = bookingsMockArray;
      jest.spyOn(service, 'getAll').mockImplementation(() => Promise.resolve(result));
      expect(await controller.getAll()).toBe(result);
    });
  });

  describe('getOne', () => {
    it('should return a single booking', async () => {
      const result = bookingsMockArray[0];
      jest.spyOn(service, 'getOne').mockImplementation(() => Promise.resolve(result));
      expect(await controller.getOne('1')).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a booking', async () => {
      const data = bookingsMockCreate;
      jest.spyOn(service, 'create').mockImplementation(() => Promise.resolve(bookingsMockArray[0]));
      expect(await controller.create(data)).toBe(bookingsMockArray[0]);
    });
  });
});
