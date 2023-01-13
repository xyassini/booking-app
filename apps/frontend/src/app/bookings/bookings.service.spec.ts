import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {BookingsService} from './bookings.service';
import {Booking, User} from '@prisma/client';
import {bookingsMockArray, bookingsMockCreate} from "./bookings.mock";

describe('BookingsService', () => {
  let service: BookingsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookingsService],
    });
    service = TestBed.inject(BookingsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should return an array of bookings', (done) => {
      const bookings = bookingsMockArray;

      service.getAll().subscribe((res) => {
        expect(res).toEqual(bookings);
        done();
      });

      const req = httpMock.expectOne('/api/bookings');
      expect(req.request.method).toBe('GET');
      req.flush(bookings);
    });
  });

  describe('getOne', () => {
    it('should return a single booking when it is not in the currentBooking$ subject', (done) => {
      const booking = bookingsMockArray[0];

      service.getOne('1').subscribe((res) => {
        expect(res).toEqual(booking);
        done();
      });

      const req = httpMock.expectOne('/api/bookings/1');
      expect(req.request.method).toBe('GET');
      req.flush(booking);
    });

    it('should return a single booking when it is in the currentBooking$ subject', (done) => {
      const booking = bookingsMockArray[0];
      service.currentBooking$.next(booking);
      service.getOne('1').subscribe((res) => {
        expect(res).toEqual(booking);
        done();
      });
    });
  });

  describe('create', () => {
    it('should create a new booking', (done) => {
      const data = bookingsMockCreate;
      const booking = {id: '1', ...data, user: {id: '1', ...data.user}} as Booking & { user: User };

      service.create(data).subscribe((res) => {
        expect(res).toEqual(booking);
        done();
      });

      const req = httpMock.expectOne('/api/bookings');
      expect(req.request.method).toBe('POST');
      req.flush(booking);
    });
  });
});

