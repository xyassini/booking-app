import {Body, Controller, Get, Param, Post} from '@nestjs/common';
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

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.bookingsService.getOne(id);
  }

  @Post()
  async create(@Body() data: CreateBookingDto) {
    return this.bookingsService.create(data);
  }
}
