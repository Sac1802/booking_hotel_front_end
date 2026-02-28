import { Component, output, inject, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { RoomFilter } from '../../../core/interface/room-filter.interface';
import { HotelService } from '../../../core/services/hotel.service';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [FormsModule, MatIconModule, MatSliderModule],
  templateUrl: './search-form.html',
  styleUrl: './search-form.scss',
})
export class SearchForm {
  private hotelService = inject(HotelService);
  filter: RoomFilter = {};
  search = output<RoomFilter>();

  availableLocations = computed(() => {
    const hotels = this.hotelService.hotels();
    const locations = hotels.map(h => h.city);
    return [...new Set(locations)];
  });

  emitSearch() {
    const cleanFilter: RoomFilter = { ...this.filter };

    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    if (!cleanFilter.startDate) {
      const today = new Date();
      cleanFilter.startDate = formatDate(today) as any;
    }
    if (!cleanFilter.endDate) {
      const maxDate = new Date();
      maxDate.setFullYear(maxDate.getFullYear() + 1);
      cleanFilter.endDate = formatDate(maxDate) as any;
    }

    if (!cleanFilter.city) delete cleanFilter.city;
    if (!cleanFilter.peopleCount) delete cleanFilter.peopleCount;
    if (!cleanFilter.minPrice) delete cleanFilter.minPrice;
    if (!cleanFilter.maxPrice) delete cleanFilter.maxPrice;

    this.search.emit(cleanFilter);
  }
}
