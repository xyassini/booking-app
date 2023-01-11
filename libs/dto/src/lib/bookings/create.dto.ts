import {Prisma} from "@prisma/client";

export interface CreateBookingDto {
  booking: Omit<Prisma.BookingCreateInput, 'user'>,
  user: Prisma.UserCreateInput
}
