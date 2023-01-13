import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Booking, User} from "@prisma/client";
import {BehaviorSubject, first, Observable, of, tap} from "rxjs";
import {CreateBookingDto} from "@booking-app/dto";

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  currentBooking$: BehaviorSubject<Booking & { user: User } | undefined> = new BehaviorSubject<Booking & { user: User } | undefined>(undefined);

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Array<Booking & {user: User}>> {
    return this.http.get<Array<Booking & {user: User}>>('/api/bookings');
  }

  getOne(id: string): Observable<Booking & { user: User }> {
    if (this.currentBooking$.value?.id === id) {
      // if the booking is already in the currentBooking$ subject, return it, then complete the stream
      return of(this.currentBooking$.value).pipe(first());
    } else {
      return this.http.get<Booking & { user: User }>(`/api/bookings/${id}`).pipe(
        tap(booking => this.currentBooking$.next(booking))
      );
    }
  }

  create(data: CreateBookingDto): Observable<Booking & { user: User }> {
    return this.http.post<Booking & { user: User }>('/api/bookings', data).pipe(
      tap(booking => this.currentBooking$.next(booking))
    );
  }
}
