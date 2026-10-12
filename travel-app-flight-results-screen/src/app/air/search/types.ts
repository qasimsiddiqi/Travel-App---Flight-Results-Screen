export type FlightOffer = {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  from: string;
  to: string;
  fromCity: string;
  toCity: string;
  departTime: string;
  arriveTime: string;
  durationMinutes: number;
  stops: number;
  price: number;
  cabin: string;
  aircraft: string;
};
