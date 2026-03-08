import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Booking } from '../../../core/interface/booking.interface';

@Component({
  selector: 'app-booking-card',
  imports: [CommonModule, MatIconModule],
  templateUrl: './booking-card.html',
  styleUrl: './booking-card.scss',
})
export class BookingCard {
  booking = input.required<Booking>();
  isCancelling = input<boolean>(false);
  cancel = output<string[]>();

  onCancel(): void {
    if(!this.booking().reservationIds) return;
    this.cancel.emit(this.booking().reservationIds);
  }

  statusLabel(roomIndex?: number): string {
    const item = this.booking();
    if (roomIndex !== undefined) {
      return item.status[roomIndex] === '1' ? 'Cancelado' : 'Confirmado';
    }
    const hasCancelledRooms = item.status.includes('1');

    if (hasCancelledRooms) {
      return 'Cancelada';
    }

    return 'Confirmada';
  }

  canCancel(): boolean {
    return this.booking().status.includes('0');
  }

  formatDateUtc(date: string): string {
    return new Date(date).toLocaleDateString('es-PA', { timeZone: 'UTC' });
  }
}
