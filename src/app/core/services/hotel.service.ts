import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hotel } from '../interface/hotel.interface';
import { Observable } from 'rxjs';

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

  getByIdHotel(id: string): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.baseURL}/hotels/get/${id}`);
  }
}
