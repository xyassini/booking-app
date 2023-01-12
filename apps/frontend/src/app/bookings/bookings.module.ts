import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingsRoutingModule } from './bookings-routing.module';
import { BookingsCreateComponent } from './bookings-create/bookings-create.component';
import { BookingsComponent } from './bookings.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BookingsCreateComponent,
    BookingsComponent,
  ],
  imports: [CommonModule, BookingsRoutingModule],
})
export class BookingsModule {}
