import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import {PrismaService} from "../shared/prisma.service";

@Module({
  providers: [PrismaService, BookingsService],
  controllers: [BookingsController],
})
export class BookingsModule {}
