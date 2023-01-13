import {Component, Input} from '@angular/core';
import {Booking, User} from "@prisma/client";

@Component({
  selector: 'booking-app-booking-item',
  templateUrl: './booking-item.component.html',
  styleUrls: ['./booking-item.component.css'],
})
export class BookingItemComponent {
  @Input() booking!: Booking & { user: User };
}
