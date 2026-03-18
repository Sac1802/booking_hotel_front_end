import { Component, input, computed, inject } from '@angular/core';
import { Hotel } from '../../../core/interface/hotel.interface';
import { SearchResult } from '../../../core/interface/search-result.interface';
import { Room } from '../room/room';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RoomSuggestion } from '../../../core/interface/room-suggestion.interface';
import { RouterLink } from "@angular/router";
import { SearchService } from '../../../core/services/search.service';

@Component({
  selector: 'app-hotel-card',
  standalone: true,
  imports: [Room, MatIconModule, CommonModule, RouterLink],
  templateUrl: './hotel-card.html',
  styleUrl: './hotel-card.scss',
})
export class HotelCard {
  private searchService = inject(SearchService);

  data = input.required<Hotel | SearchResult>();

  name = computed(() => {
    const d = this.data();
    return 'hotelName' in d ? (d as SearchResult).hotelName : (d as Hotel).name;
  });

  location = computed(() => {
    const d = this.data();
    return 'location' in d ? (d as SearchResult).location : (d as Hotel).city;
  });

  totalPrice = computed(() => {
    const d = this.data();
    return 'totalPrice' in d ? (d as SearchResult).totalPrice: (d as unknown as RoomSuggestion).totalPrice;
  });

  description = computed(() => {
    const d = this.data();
    return 'optionLabel' in d ? (d as SearchResult).optionLabel : (d as Hotel).description;
  });

  promo = computed(() => {
    const d = this.data();
    return 'promotions' in d ? (d as Hotel).promotions : [];
  });

  suggestion = computed(() => {
    const d = this.data();
    return 'rooms' in d ? (d as SearchResult).rooms : [];
  });

  idHotel = computed(() => {
    const d = this.data();
    return '_id' in d ? (d as Hotel)._id : (d as SearchResult).hotelId;
  });

  bookingState = computed(() => {
    const d = this.data();
    const filter = this.searchService.lastFilter();
    const isSearchResult = 'rooms' in d;

    return {
      suggestedRooms: isSearchResult ? (d as SearchResult).rooms : [],
      checkIn: filter?.startDate ? String(filter.startDate) : null,
      checkOut: filter?.endDate ? String(filter.endDate) : null,
      guests: filter?.peopleCount ?? null,
      hotelName: this.name(),
      hotelCity: this.location(),
      hotelDescription: this.description(),
      hotelPromotions: this.promo(),
    };
  });
}
