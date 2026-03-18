export interface PreBooking{
    hotelId?: string;
    startDate: Date;
    endDate: Date;
    roomsId: string[];
    adultCount: number;
    childCount: number;
}