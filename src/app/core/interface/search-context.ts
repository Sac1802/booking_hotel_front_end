import { RoomSuggestion } from "./room-suggestion.interface";

export interface SearchContext {
  suggestedRooms?: RoomSuggestion[];
  checkIn?: string | null;
  checkOut?: string | null;
  guests?: number;
  hotelName?: string;
  hotelCity?: string;
  hotelDescription?: string;
  hotelPromotions?: string[];
}
