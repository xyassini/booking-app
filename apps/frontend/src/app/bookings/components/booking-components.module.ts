import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingItemComponent } from './booking-item/booking-item.component';
import {RouterLink} from "@angular/router";

@NgModule({
    declarations: [BookingItemComponent],
  imports: [CommonModule, RouterLink],
    exports: [
        BookingItemComponent
    ]
})
export class BookingComponentsModule {}
