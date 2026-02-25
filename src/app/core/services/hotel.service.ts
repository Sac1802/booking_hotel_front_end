import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hotel } from '../interface/hotel.interface';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private http = inject(HttpClient);
  private baseURL = 'http://localhost:3000';

  hotels = signal<Hotel[]>([]);

  loadHotels(): void {
    this.http.get<Hotel[]>(`${this.baseURL}/hotels/get/all`).subscribe({
      next: (data) => {
        this.hotels.set(data);
      },
      error: (error) => console.error('Error load hotels', error),
    });
  }
}
