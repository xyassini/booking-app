import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {Litepicker} from "litepicker";
import {ClassValidatorFormControl, ClassValidatorFormGroup} from "ngx-reactive-form-class-validator";
import {CreateBookingDto, CreateUserDto} from "@booking-app/dto";
import {BookingsService} from "../bookings.service";
import {Router} from "@angular/router";

@Component({
  selector: 'booking-app-bookings-create',
  templateUrl: './bookings-create.component.html',
  styleUrls: ['./bookings-create.component.css']
})
export class BookingsCreateComponent implements AfterViewInit {
  @ViewChild('datepicker') datepicker!: ElementRef;

  form = new ClassValidatorFormGroup(CreateBookingDto, {
    from: new ClassValidatorFormControl(new Date()),
    to: new ClassValidatorFormControl(new Date(new Date().setDate(new Date().getDate() + 3))),
    guestCount: new ClassValidatorFormControl(2),
    user: new ClassValidatorFormGroup(CreateUserDto, {
      email: new ClassValidatorFormControl(''),
      firstName: new ClassValidatorFormControl(''),
      lastName: new ClassValidatorFormControl(''),
      address: new ClassValidatorFormControl(''),
      country: new ClassValidatorFormControl(''),
      postalCode: new ClassValidatorFormControl(''),
      city: new ClassValidatorFormControl(''),
      phone: new ClassValidatorFormControl(''),
    })
  });

  loading = false;

  constructor(private bookingsService: BookingsService, private router: Router, private ref: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    new Litepicker({
      element: this.datepicker.nativeElement,
      singleMode: false,
      format: 'MMM D, YYYY',
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 3)),
      minDate: new Date(),
      minDays: 2,
      setup: (picker) => {
        picker.on('selected', (fromDate, toDate) => {
          this.form.controls.from.setValue(fromDate.dateInstance);
          this.form.controls.to.setValue(toDate.dateInstance);
        })
      }
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      console.log("form", this.form);
      this.form.markAllAsTouched();
      return
    }
    this.loading = true;

    // TODO: disable button while loading
    this.bookingsService.create(this.form.value as CreateBookingDto).subscribe({
      next: res => {
        this.router.navigate(['/confirm', res.id]);
      },
      error: err => {
        // TODO: add error toast
        console.error('=> err', err);
        this.loading = false;
      }
    })
  }
}
