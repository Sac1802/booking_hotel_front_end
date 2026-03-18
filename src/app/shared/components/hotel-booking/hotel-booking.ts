import { Component, effect, inject, OnInit, signal, untracked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Room } from '../room/room';
import { RoomSuggestion } from '../../../core/interface/room-suggestion.interface';
import { RoomService } from '../../../core/services/room.service';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SearchContext } from '../../../core/interface/search-context';
import { Hotel } from '../../../core/interface/hotel.interface';
import { HotelService } from '../../../core/services/hotel.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingFilterSnapshot } from '../../../core/interface/booking-filter-snapshot.interface';
import { PreBooking } from '../../../core/interface/pre-booking.interface';

@Component({
  selector: 'app-hotel-booking',
  standalone: true,
  imports: [Room, CurrencyPipe, MatIconModule, FormsModule],
  templateUrl: './hotel-booking.html',
  styleUrl: './hotel-booking.scss',
})
export class HotelBooking implements OnInit {
  private route = inject(ActivatedRoute);
  private roomService = inject(RoomService);
  private hotelService = inject(HotelService);
  private router = inject(Router);

  hotelId = signal<string | null>(null);
  dates = signal({ checkIn: '', checkOut: '' });
  adults = signal<number>(1);
  children = signal<number>(0);

  initialSuggestedRooms = signal<RoomSuggestion[]>([]);
  availableRooms = signal<RoomSuggestion[]>([]);
  userSelectedRooms = signal<RoomSuggestion[]>([]);
  selectedRoomKeys = signal<Set<string>>(new Set());

  detailsHotel?: Hotel;
  private hydrated = signal(false);
  private initialFilter: BookingFilterSnapshot | null = null;

  constructor() {
    effect(() => {
      if (!this.hydrated()) return;

      const id = this.hotelId();
      const { checkIn, checkOut } = this.dates();
      const adultCount = this.adults();
      const childCount = this.children();

      untracked(() => {
        if (this.filterChanged(checkIn, checkOut, adultCount, childCount)) {
          this.initialSuggestedRooms.set([]);
        }
      });

      if (id && checkIn && checkOut) {
        this.fetchRooms(id, checkIn, checkOut, adultCount + childCount);
      }
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.hotelId.set(id);
    const state = (window.history.state ?? {}) as SearchContext;

    if (state.hotelName || state.hotelCity || state.hotelDescription || state.hotelPromotions?.length) {
      this.detailsHotel = {
        _id: id ?? '',
        name: state.hotelName ?? 'Hotel',
        city: state.hotelCity ?? 'Ubicación no disponible',
        description: state.hotelDescription ?? 'Sin descripción disponible.',
        promotions: state.hotelPromotions ?? [],
      };
    }

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const checkIn = this.normalizeDateInput(state.checkIn) ?? this.formatDate(today);
    const checkOut = this.normalizeDateInput(state.checkOut) ?? this.normalizeDateInput(state.checkIn) ?? this.formatDate(tomorrow);

    this.dates.set({
      checkIn,
      checkOut: checkOut < checkIn ? checkIn : checkOut,
    });
    this.adults.set(state.guests || 1);

    if (state.suggestedRooms?.length) {
      this.initialSuggestedRooms.set(state.suggestedRooms);
    }

    this.initialFilter = {
      ...this.dates(),
      adultCount: this.adults(),
      childCount: this.children(),
    };

    if (id) this.fetchHotel(id);
    this.hydrated.set(true);
  }

  fetchRooms(hotelId: string, startDate: string, endDate: string, peopleCount: number) {
    this.roomService.getAvailableRooms(hotelId, { startDate, endDate, peopleCount }).subscribe({
      next: (rooms) => this.availableRooms.set(rooms),
      error: () => {
        this.roomService.getRoomsByIdHotel(hotelId).subscribe({
          next: (rooms) => this.availableRooms.set(rooms),
          error: () => this.availableRooms.set([]),
        });
      },
    });
  }

  fetchHotel(id: string) {
    this.hotelService.getByIdHotel(id).subscribe((data) => (this.detailsHotel = data));
  }

  toggleRoom(room: RoomSuggestion) {
    const key = this.getRoomKey(room);
    const keys = new Set(this.selectedRoomKeys());

    if (keys.has(key)) {
      keys.delete(key);
      this.userSelectedRooms.update((prev) => prev.filter((r) => this.getRoomKey(r) !== key));
    } else {
      keys.add(key);
      this.userSelectedRooms.update((prev) => [...prev, room]);
    }
    this.selectedRoomKeys.set(keys);
  }

  updateDates(field: 'checkIn' | 'checkOut', value: string) {
    this.dates.update((prev) => {
      const normalized = this.normalizeDateInput(value) ?? prev[field];
      const newDates = { ...prev, [field]: normalized };
      if (newDates.checkOut < newDates.checkIn) newDates.checkOut = newDates.checkIn;
      return newDates;
    });
  }

  private normalizeDateInput(value?: string | null): string | null {
    if (!value) return null;
    const onlyDatePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (onlyDatePattern.test(value)) return value;

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return null;
    return this.formatDate(parsed);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private filterChanged(cin: string, cout: string, ad: number, ch: number): boolean {
    if (!this.initialFilter) return false;
    return (
      cin !== this.initialFilter.checkIn ||
      cout !== this.initialFilter.checkOut ||
      ad !== this.initialFilter.adultCount ||
      ch !== this.initialFilter.childCount
    );
  }

  private getRoomBackendId(room: RoomSuggestion): string | null {
    return room._id ?? room.id ?? null;
  }

  private getRoomKey(room: RoomSuggestion): string {
    return this.getRoomBackendId(room) ?? `${room.type}-${room.price}`;
  }

  isRoomSelected = (room: RoomSuggestion) => this.selectedRoomKeys().has(this.getRoomKey(room));
  getTotalPrice = () => this.userSelectedRooms().reduce((acc, r) => acc + r.price, 0);

  getRoomTrackBy(room: RoomSuggestion): string {
    return this.getRoomKey(room);
  }

  getHotelPromotions(): string[] {
    return this.detailsHotel?.promotions ?? [];
  }

  proceedToCheckout() {
    if (this.userSelectedRooms().length === 0) {
      alert('Por favor selecciona al menos una habitación');
      return;
    }

    const roomsId = this.userSelectedRooms()
      .map((room) => this.getRoomBackendId(room))
      .filter((id): id is string => !!id);

    if (roomsId.length !== this.userSelectedRooms().length) {
      alert('Algunas habitaciones seleccionadas no tienen ID válido. Intenta seleccionar nuevamente.');
      return;
    }

    const bookingData: PreBooking = {
      hotelId: this.hotelId() ?? '',
      startDate: new Date(this.dates().checkIn),
      endDate: new Date(this.dates().checkOut),
      roomsId,
      adultCount: this.adults(),
      childCount: this.children(),
    };

    this.router.navigate(['/bookings/details'], { state: { data: bookingData } });
  }
}
