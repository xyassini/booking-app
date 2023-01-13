import {Test, TestingModule} from '@nestjs/testing';
import {BookingsService} from './bookings.service';
import {PrismaService} from '../shared/prisma.service';
import {PrismaClient} from '@prisma/client';
import {bookingsMockArray, bookingsMockCreate} from "./bookings.mock";

const prisma = new PrismaClient();

describe('Bookings Service', () => {
  let service: BookingsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsService,
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();

    service = module.get<BookingsService>(BookingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // "as any", I know, but I didn't want to bother with properly mocking the prisma client here
  describe('getAll', () => {
    it('should return an array of bookings', async () => {
      jest.spyOn(prisma.booking, 'findMany').mockImplementation(() => Promise.resolve(bookingsMockArray) as any);
      expect(await service.getAll()).toBe(bookingsMockArray);
    });
  });

  describe('getOne', () => {
    it('should return a single booking', async () => {
      jest.spyOn(prisma.booking, 'findUnique').mockImplementation(() => Promise.resolve(bookingsMockArray[0]) as any);
      expect(await service.getOne('1')).toEqual(bookingsMockArray[0]);
    });
  });

  describe('create', () => {
    it('should create a new booking and user if the email is not already taken', async () => {
      const data = bookingsMockCreate;
      jest.spyOn(prisma.booking, 'create').mockImplementation(() => Promise.resolve(bookingsMockArray[0]) as any);
      expect(await service.create(data)).toEqual(bookingsMockArray[0]);
    });
  });
});
