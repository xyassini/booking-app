import {Injectable} from '@nestjs/common';
import {PrismaService} from "../shared/prisma.service";
import {CreateBookingDto} from "@booking-app/dto";
import {Booking, User} from "@prisma/client";

@Injectable()
export class BookingsService {

  constructor(private prisma: PrismaService) {
  }

  /**
   * Get all bookings
   * @returns {Promise<Array<Booking & { user: User }>>} - all bookings
   */
  async getAll(): Promise<Array<Booking & { user: User }>> {
    return this.prisma.booking.findMany({
      include: {
        user: true
      }
    });
  }

  /**
   * Create a new booking, additionally creates a new user if the email is not already taken,
   * otherwise it will use the existing user
   * @param {CreateBookingDto} data - booking with nested user
   * @returns {Promise<Booking & { user: User }>} - created booking
   */
  async create(data: CreateBookingDto): Promise<Booking & { user: User }> {
    return this.prisma.booking.create({
      data: {
        ...data,
        user: {
          connectOrCreate: {
            where: {
              email: data.user.email
            },
            create: data.user
          }
        }
      },
      include: {
        user: true
      }
    });
  }
}
