import {Reservation} from "./Reservation";

export class Department {
  public department: string;
  public reservation: Reservation[];

  constructor(department: string, reservation: Reservation[]) {
    this.department = department;
    this.reservation = reservation;
  }
}
