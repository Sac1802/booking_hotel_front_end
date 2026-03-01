import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { PreBooking } from '../interface/pre-booking.interface';
import { ReservationSummary } from '../interface/reservation-summary.interface';

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
}
