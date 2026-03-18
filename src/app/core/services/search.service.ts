import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchResult } from '../interface/search-result.interface';
import { RoomFilter } from '../interface/room-filter.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private http = inject(HttpClient);
  private urlBase = 'http://localhost:3000';

  searchResult = signal<SearchResult[]>([]);
  lastFilter = signal<RoomFilter | null>(null);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  search(params: RoomFilter): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.lastFilter.set(params);
    let httpParam = new HttpParams();

    for (const filterKey in params) {
      const k = filterKey as keyof RoomFilter;
      const value = params[k];

      if (value) {
        httpParam = httpParam.set(k, value.toString());
      }
    }

    this.http.get<SearchResult[]>(`${this.urlBase}/search`, { params: httpParam }).subscribe({
      next: (result) => {
        this.searchResult.set(result);
        console.log(result);
      },
      error: (error) => {
        this.error.set(error.message || 'Error obtaining search results');
        console.error('Error obtaining search results', error);
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }
}
