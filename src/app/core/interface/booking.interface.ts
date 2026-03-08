import { RoomBooking } from "./room-bookings.interface";

export interface Booking{
    checkIn: string;
    checkOut: string;
    reservationIds: string[];
    hotelName: string;
    rooms: RoomBooking[];
    totalCost: number;
    status: string[];
}
