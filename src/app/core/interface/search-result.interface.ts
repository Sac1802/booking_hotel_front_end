import { RoomSuggestion } from "./room-suggestion.interface";

export interface SearchResult {
    hotelId: string;
    hotelName: string;
    location: string;
    optionLabel: string;
    rooms: RoomSuggestion[];
    totalPrice: number;
    available: boolean;
}