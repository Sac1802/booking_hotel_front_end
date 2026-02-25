import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoomFilter } from '../../../core/interface/room-filter.interface';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-form.html',
  styleUrl: './search-form.scss',
})
export class SearchForm {
  filter: RoomFilter = {};
  search = output<RoomFilter>();

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
