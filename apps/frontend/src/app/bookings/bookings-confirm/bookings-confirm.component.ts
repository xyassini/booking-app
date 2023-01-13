import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BookingsService} from "../bookings.service";
import {Booking, User} from "@prisma/client";
import {Observable} from "rxjs";

@Component({
  selector: 'booking-app-bookings-confirm',
  templateUrl: './bookings-confirm.component.html',
  styleUrls: ['./bookings-confirm.component.css'],
})
export class BookingsConfirmComponent implements OnInit {
  booking$!: Observable<Booking & {user: User}>;

  constructor(private route: ActivatedRoute, private router: Router, private bookingsService: BookingsService) {
  }

  ngOnInit() {
    const { id } = this.route.snapshot.params;
    this.booking$ = this.bookingsService.getOne(id);
  }
}
