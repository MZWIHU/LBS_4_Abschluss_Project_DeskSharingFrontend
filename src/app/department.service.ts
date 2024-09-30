import {Injectable} from '@angular/core';
import {Department} from "./domain/Department";
import {Reservation} from "./domain/Reservation";
import {User} from "./domain/User";
import {Desk} from "./domain/Desk";

@Injectable({
  providedIn: 'root'
})

export class DepartmentService {
  public reservations: Map<string, Reservation[]> = new Map;

  constructor() {
    this.reservations.set("WDS", [new Reservation("25-09-2024", new User("test@test.com", "test", "testicle", "WDS"), new Desk(1, 0))]);
    this.reservations.set("ACPR", [new Reservation("25-09-2024", new User("test@test.com", "test", "testicle", "ACPR"), new Desk(2, 1))])
  }

  getReservations(): Map<string, Reservation[]> {
    return this.reservations;
  }

  getListOfReservationsByDepartment(map: Map<string, Reservation[]>, department: string): Reservation[] {
    let depReservations: Reservation[] = [];
    depReservations = map.get(department)
    let i: number;
    for (let depReservation of depReservations) {
      i++;
      depReservation.position = i;
    }

    return depReservations;
  }


}

