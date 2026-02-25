import { Component, input } from '@angular/core';
import { Hotel } from '../../../core/interface/hotel.interface';
import { SearchResult } from '../../../core/interface/search-result.interface';
import { HotelCard } from '../hotel-card/hotel-card';

@Component({
  selector: 'app-hotel-list',
  standalone: true,
  imports: [HotelCard],
  templateUrl: './hotel-list.html',
  styleUrl: './hotel-list.scss',
})
export class HotelList {

  hotels = input.required<Hotel[] | SearchResult[]>();
}
