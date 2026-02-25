import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelService } from '../../core/services/hotel.service';
import { SearchService } from '../../core/services/search.service';
import { RoomFilter } from '../../core/interface/room-filter.interface';
import { SearchForm } from '../../shared/components/search-form/search-form';
import { HotelList } from '../../shared/components/hotel-list/hotel-list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SearchForm, HotelList],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  public hotelService = inject(HotelService);
  public searchService = inject(SearchService);

  errorMessage = computed(() => this.searchService.error());

  ngOnInit() {
    this.hotelService.loadHotels();
  }

  onSearch(filters: RoomFilter) {
    this.searchService.search(filters);
  }


  hotelsRes = computed(() => {
    if (this.searchService.searchResult().length > 0) {
      return this.searchService.searchResult();
    } else {
      return this.hotelService.hotels();
    }
  });
}
