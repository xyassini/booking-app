import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BookingItemComponent} from './booking-item.component';
import {bookingsMockArray} from "../../bookings.mock";
import {By} from "@angular/platform-browser";
import {RouterTestingModule} from "@angular/router/testing";

describe('BookingItemComponent', () => {
  let component: BookingItemComponent;
  let fixture: ComponentFixture<BookingItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [BookingItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingItemComponent);
    component = fixture.componentInstance;
    component.booking = {
      ...bookingsMockArray[0],
      from: new Date(2023, 0, 1),
      to: new Date(2023, 0, 3)
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the guest count', () => {
    const el = fixture.debugElement.query(By.css('.booking-title'));
    expect(el.nativeElement.textContent).toContain(`${component.booking.guestCount} guests`);
  });

  it('should display the date range', () => {
    const el = fixture.debugElement.query(By.css('.subtitle'));
    expect(el.nativeElement.textContent).toContain('Jan 1, 2023 - Jan 3, 2023');
  });

  it('should display the user details', () => {
    const { user } = component.booking;
    const el = fixture.debugElement.query(By.css('.booking-details'));
    expect(el.nativeElement.textContent).toContain(`${user.firstName} ${user.lastName}`);
    expect(el.nativeElement.textContent).toContain(user.email);
    expect(el.nativeElement.textContent).toContain(user.phone);
    expect(el.nativeElement.textContent).toContain(user.address);
    expect(el.nativeElement.textContent).toContain(`${user.postalCode} ${user.city}, ${user.country}`);
  });

  it('should have a link to the confirmation page', () => {
    const el = fixture.debugElement.query(By.css('a'));
    expect(el.attributes['href']).toEqual('/confirm/1');
  });
});
