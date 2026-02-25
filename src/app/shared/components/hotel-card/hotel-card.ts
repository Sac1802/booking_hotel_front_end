import { Component, input, computed } from '@angular/core';
import { Hotel } from '../../../core/interface/hotel.interface';
import { SearchResult } from '../../../core/interface/search-result.interface';
import { Room } from '../room/room';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hotel-card',
  standalone: true,
  imports: [Room, MatIconModule, CommonModule],
  templateUrl: './hotel-card.html',
  styleUrl: './hotel-card.scss',
})
export class HotelCard {
  data = input.required<Hotel | SearchResult>();

  location = computed(() => {
    const d = this.data();
    return 'location' in d ? (d as Hotel).location : null;
  });

  promo = computed(() => {
    const d = this.data();
    return 'promotions' in d ? (d as Hotel).promotions : [];
  });

  suggestion = computed(() => {
    const d = this.data();
    return 'suggestedRooms' in d ? (d as SearchResult).suggestedRooms : [];
  });
}
