import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RoomSuggestion } from '../interface/room-suggestion.interface';
import { RoomAvailabilityParams } from '../interface/room-availability-params.interface';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private http = inject(HttpClient);
  private baseURL = 'http://localhost:3000';

  getRoomsByIdHotel(id: string): Observable<RoomSuggestion[]> {
    return this.http.get<RoomSuggestion[]>(`${this.baseURL}/rooms/get/hotel/${id}`).pipe(
      catchError((error) => {
        console.error('Error load rooms', error);
        return throwError(() => new Error('Error al cargar habitaciones'));
      }),
    );
  }

  getAvailableRooms(id: string, params: RoomAvailabilityParams): Observable<RoomSuggestion[]> {
    let httpParams = new HttpParams();

    if (params.startDate) httpParams = httpParams.set('startDate', params.startDate);
    if (params.endDate) httpParams = httpParams.set('endDate', params.endDate);
    if (params.peopleCount && params.peopleCount > 0) {
      httpParams = httpParams.set('peopleCount', params.peopleCount);
    }

    return this.http
      .get<RoomSuggestion[]>(`${this.baseURL}/rooms/get/hotel/${id}`, { params: httpParams })
      .pipe(
        catchError((error) => {
          console.error('Error load available rooms', error);
          return throwError(() => new Error('Error al cargar habitaciones disponibles'));
        }),
      );
  }
}
