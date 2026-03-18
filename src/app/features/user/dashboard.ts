import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../core/services/reservation.service';
import { inject } from '@angular/core';
import { Booking } from '../../core/interface/booking.interface';
import { BookingCard } from '../../shared/components/booking-card/booking-card';
import { MatIconModule } from '@angular/material/icon';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, BookingCard, MatIconModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private service = inject(ReservationService);
  bookings = signal<Booking[]>([]);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);
  isCancelling = signal<string | null>(null);

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.service.getUserBookings().subscribe({
      next: (data) => {
        this.bookings.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar tus reservas.');
        this.isLoading.set(false);
      },
    });
  }

  handleCancel(ids: string[]): void {
    if (!ids.length) return;
    if (!window.confirm('¿Seguro que deseas cancelar esta reserva?')) return;

    this.isCancelling.set(ids[0]);
    this.error.set(null);
    let completed = 0;
    let hasError = false;

    ids.forEach((id) => {
      this.service
        .cancelBooking(id)
        .pipe(
          catchError((err: { status?: number }) => {
            hasError = true;
            this.setCancelError(err);
            return of(null);
          }),
        )
        .subscribe(() => {
          completed += 1;

          if (completed < ids.length) return;

          if (!hasError) {
            this.markAsCancelled(ids);
          } else {
            setTimeout(() => this.error.set(null), 6000);
          }

          this.isCancelling.set(null);
        });
    });
  }

  private setCancelError(err: { status?: number }): void {
    if (this.error()) return;

    if (err?.status === 400) {
      this.error.set(
        'Cancelación rechazada. La política exige cancelar tres días antes de la reserva y el plazo ha expirado.',
      );
      return;
    }

    this.error.set('Ocurrió un error inesperado. Intenta nuevamente.');
  }

  private markAsCancelled(ids: string[]): void {
    this.bookings.update((list) =>
      list.map((b) =>
        b.reservationIds.some((reservationId) => ids.includes(reservationId))
          ? { ...b, status: b.status.map(() => '1') }
          : b,
      ),
    );
  }

  isDisabled(ids: string[]): boolean {
    return this.isCancelling() === ids[0];
  }
}
