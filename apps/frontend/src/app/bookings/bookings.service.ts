import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Booking} from "@prisma/client";
import {Observable} from "rxjs";
import {CreateBookingDto} from "@booking-app/dto";

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Booking[]> {
    return this.http.get<Booking[]>('/api/bookings');
  }

  create(data: CreateBookingDto): Observable<Booking> {
    return this.http.post<Booking>('/api/bookings', data);
  }
}
