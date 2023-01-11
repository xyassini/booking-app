import { Injectable } from '@nestjs/common';
import {PrismaService} from "../shared/prisma.service";

@Injectable()
export class BookingsService {

  constructor(private prisma: PrismaService) {
  }

  async getAll() {
    return this.prisma.booking.findMany();
  }

  async create(data) {
    return this.prisma.booking.create({
      data
    });
  }
}
