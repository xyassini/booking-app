import {Injectable} from '@nestjs/common';
import {PrismaService} from "../shared/prisma.service";
import {CreateBookingDto} from "@booking-app/dto";

@Injectable()
export class BookingsService {

  constructor(private prisma: PrismaService) {
  }

  /**
   * Get all bookings
   * @returns {Promise<Booking[]>} - all bookings
   */
  async getAll() {
    return this.prisma.booking.findMany();
  }

  /**
   * Create a new booking, additionally creates a new user if the email is not already taken,
   * otherwise it will use the existing user
   * @param {CreateBookingDto} data - booking with nested user
   * @returns {Promise<Booking>} - created booking
   */
  async create(data: CreateBookingDto) {
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
    });
  }
}
