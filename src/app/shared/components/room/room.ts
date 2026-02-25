import { Component, input, output } from '@angular/core';
import { RoomSuggestion } from '../../../core/interface/room-suggestion.interface';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [MatIconModule, CurrencyPipe],
  templateUrl: './room.html',
  styleUrl: './room.scss',
})
export class Room {
  room = input.required<RoomSuggestion>();
}
