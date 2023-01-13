import {Component, OnInit} from '@angular/core';
import {BookingsService} from "./bookings.service";
import {Observable} from "rxjs";
import {Booking, User} from "@prisma/client";

@Component({
  selector: 'booking-app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent implements OnInit {
  bookings$!: Observable<Array<Booking & {user: User}>>;

  constructor(private bookingsService: BookingsService) {
  }

  ngOnInit(): void {
    this.bookings$ = this.bookingsService.getAll();
  }
}
