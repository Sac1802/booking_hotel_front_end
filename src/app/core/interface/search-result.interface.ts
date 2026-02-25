import { RoomSuggestion } from "./room-suggestion.interface";

export interface SearchResult extends RoomSuggestion{
    suggestedRooms: RoomSuggestion[];
    totalPrice: number;
}