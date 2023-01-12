import {Body, Controller, Get, Post} from '@nestjs/common';
import {BookingsService} from "./bookings.service";
import {CreateBookingDto} from "@booking-app/dto";

@Controller('bookings')
export class BookingsController {
  constructor(private bookingsService: BookingsService) {
  }

  @Get()
  async getAll() {
    return this.bookingsService.getAll();
  }

  @Post()
  async create(@Body() data: CreateBookingDto) {
    return await this.bookingsService.create(data);
  }
}
