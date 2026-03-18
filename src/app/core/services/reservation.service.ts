import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { PreBooking } from '../interface/pre-booking.interface';
import { ReservationSummary } from '../interface/reservation-summary.interface';
import { Booking } from '../interface/booking.interface';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private http = inject(HttpClient);

  preeBooking(dataPreBooking: PreBooking) {
    return this.http
      .post<ReservationSummary>(
        'http://localhost:3000/reservation/bookings/summary',
        dataPreBooking,
      )
      .pipe(
        catchError((error) => {
          console.error('Error Pre-Booking:', error);
          return throwError(() => error);
        }),
      );
  }

  confirmBook(dataPreBooking: PreBooking) {
    return this.http
      .post<string>('http://localhost:3000/reservation/bookings/confirm', dataPreBooking)
      .pipe(
        catchError((error) => {
          console.error('Error Confirm Book:', error);
          return throwError(() => error);
        }),
      );
  }

  getUserBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>('http://localhost:3000/reservation/bookings').pipe(
      catchError((error) => {
        console.error('Error get bookings', error);
        return throwError(() => error);
      }),
    );
  }

  cancelBooking(id: string): Observable<string> {
    return this.http.patch<string>(`http://localhost:3000/reservation/bookings/${id}/cancel`, {}).pipe(
      catchError((err) => {
        console.log(err);
        console.error('Error calcel booking', err);
        return throwError(() => err);
      }),
    );
  }
}
