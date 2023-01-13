import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingsRoutingModule } from './bookings-routing.module';
import { BookingsCreateComponent } from './bookings-create/bookings-create.component';
import { BookingsComponent } from './bookings.component';
import { ReactiveFormsModule } from '@angular/forms';
import {BookingsConfirmComponent} from "./bookings-confirm/bookings-confirm.component";
import {BookingComponentsModule} from "./components/booking-components.module";

@NgModule({
  declarations: [
    BookingsCreateComponent,
    BookingsComponent,
    BookingsConfirmComponent,
  ],
  imports: [CommonModule, BookingsRoutingModule, ReactiveFormsModule, BookingComponentsModule],
})
export class BookingsModule {}
