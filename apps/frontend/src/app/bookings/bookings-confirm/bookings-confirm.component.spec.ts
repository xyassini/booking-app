import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {BookingsService} from '../bookings.service';
import {BookingsConfirmComponent} from './bookings-confirm.component';
import {bookingsMockArray} from "../bookings.mock";
import {RouterTestingModule} from "@angular/router/testing";

describe('BookingsConfirmComponent', () => {
  let component: BookingsConfirmComponent;
  let fixture: ComponentFixture<BookingsConfirmComponent>;
  let bookingsService: BookingsService;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [BookingsConfirmComponent],
      providers: [
        {provide: BookingsService, useValue: {getOne: () => of(bookingsMockArray[0])}},
        {provide: ActivatedRoute, useValue: {snapshot: {params: {id: '1'}}}}
      ]
    });

    fixture = TestBed.createComponent(BookingsConfirmComponent);
    component = fixture.componentInstance;
    bookingsService = TestBed.inject(BookingsService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call bookingsService.getOne with the id from the activated route', () => {
    jest.spyOn(bookingsService, 'getOne').mockImplementation((_) => of(bookingsMockArray[0]));
    component.ngOnInit();
    expect(bookingsService.getOne).toHaveBeenCalledWith('1');
  });

  it('should display the booking details', () => {
    jest.spyOn(bookingsService, 'getOne').mockImplementation((_) => of(bookingsMockArray[0]));

    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const {user} = bookingsMockArray[0];

    expect(compiled.querySelector('h1').textContent).toContain(`Congratulations, ${user.firstName}!`);
    expect(compiled.querySelector('.confirm-subtitle').textContent).toContain(`Your booking for ${bookingsMockArray[0].guestCount} guests on Jan 13, 2023 until Jan 13, 2023 is confirmed!`);
    expect(compiled.querySelectorAll('a')[0].getAttribute('href')).toEqual('/');
    expect(compiled.querySelectorAll('a')[1].getAttribute('href')).toEqual('/create');
  });
});
