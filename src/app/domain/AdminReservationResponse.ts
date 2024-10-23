import {Reservation} from "./Reservation";

export interface AdminReservationResponse {
  reservations: Map<string, Reservation[]>
  //reservations : Reservation[]
}
