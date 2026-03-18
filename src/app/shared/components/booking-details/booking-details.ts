import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReservationService } from '../../../core/services/reservation.service';
import { PreBooking } from '../../../core/interface/pre-booking.interface';
import { ReservationSummary } from '../../../core/interface/reservation-summary.interface';
import { MatIconModule } from '@angular/material/icon';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './booking-details.html',
  styleUrl: './booking-details.scss',
})
export class BookingDetails implements OnInit {
  private router = inject(Router);
  private reservationService = inject(ReservationService);

  bookingData = signal<PreBooking | null>(null);
  summaryDetails = signal<ReservationSummary | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  isSubmitting = signal(false);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    const stateData = window.history.state?.data as PreBooking | undefined;
    if (!stateData) {
      this.router.navigate(['/']);
      return;
    }

    this.bookingData.set(stateData);
    this.fetchSummary();
  }

  fetchSummary() {
    const data = this.bookingData();
    if (!data) return;

    const payload: PreBooking = {
      startDate: data.startDate,
      endDate: data.endDate,
      roomsId: data.roomsId,
      adultCount: data.adultCount,
      childCount: data.childCount,
    };

    this.reservationService.preeBooking(payload).subscribe({
      next: (summary) => {
        this.summaryDetails.set(summary);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No pudimos cargar el detalle de tu reserva.');
        this.loading.set(false);
      },
    });
  }

  getRoomLabel(index: number, roomName?: string): string {
    return roomName || `Room ${index + 1}`;
  }

  cancel() {
    const data = this.bookingData();
    // Agregamos un fallback por si hotelId no existe
    if (data?.hotelId) {
      this.router.navigate(['hotel', data.hotelId, 'book']);
    } else {
      this.router.navigate(['/']); // O a la lista de hoteles
    }
  }

  confirmReservation() {
    const data = this.bookingData();
    if (!data) return;

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    const payload: PreBooking = {
      startDate: data.startDate,
      endDate: data.endDate,
      roomsId: data.roomsId,
      adultCount: data.adultCount,
      childCount: data.childCount,
    };

    this.reservationService
      .confirmBook(payload)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.isSubmitting.set(false);
          if (error.status === 409) {
            this.errorMessage.set(
              '¡Error! Las habitaciones seleccionadas ya no están disponibles. Por favor, regrese a la vista de reserva para una nueva selección.',
            );
            setTimeout(() => this.cancel(), 4500);
          } else {
            this.errorMessage.set('Ocurrió un error inesperado al procesar tu reserva.');
          }
          return throwError(() => error);
        }),
      )
      .subscribe({
        next: (res) => {
          this.isSubmitting.set(false);
          this.router.navigate(['/user']);
        },
      });
  }
}
