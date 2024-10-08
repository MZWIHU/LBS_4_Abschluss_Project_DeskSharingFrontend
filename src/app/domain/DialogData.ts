/*
interface for passing data to a dialog
 */

import {Reservation} from "./Reservation";

export interface DialogData{
  floor: string,
  deskID: number,
  reservations: Reservation[]
}
