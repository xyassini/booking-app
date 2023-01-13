import {Booking, User} from "@prisma/client";
import {CreateBookingDto} from "@booking-app/dto";

export const bookingsMockCreate: CreateBookingDto = {
  from: new Date(),
  to: new Date(),
  guestCount: 1,
  user: {
    email: 'test@test.com',
    firstName: 'Test',
    lastName: 'Test',
    address: 'Test Address',
    phone: '123456789',
    postalCode: '12345',
    city: 'Test City',
    country: 'DE',
  }
}

export const bookingsMockArray: Array<Booking & { user: User }> = [
  {
    id: '1',
    from: new Date(),
    to: new Date(),
    guestCount: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: '1',
    user: {
      id: '1',
      email: 'test@test.com',
      firstName: 'Test',
      lastName: 'Test',
      address: 'Test Address',
      phone: '123456789',
      postalCode: '12345',
      city: 'Test City',
      country: 'DE',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  },
  {
    id: '2',
    from: new Date(),
    to: new Date(),
    guestCount: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: '2',
    user: {
      id: '2',
      email: 'test2@test.com',
      firstName: 'Test2',
      lastName: 'Test2',
      address: 'Test2 Address',
      phone: '123456789',
      postalCode: '12345',
      city: 'Test2 City',
      country: 'DE',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }
]
