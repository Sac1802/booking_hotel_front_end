export interface ReservationSummaryRoom {
  _id: string;
  name?: string;
  capacity: number;
  price: number;
  description?: string;
}

export interface ReservationSummary {
  validated: boolean;
  checkInDate: string;
  checkOutDate: string;
  roomsSelected: ReservationSummaryRoom[];
  nightsCount: number;
  baseCost: number;
  estimatedDiscount: number;
  finalCost: number;
  cancellationPolicy: string;
  promotionsApplied: string[];
}
