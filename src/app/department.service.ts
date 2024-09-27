import { Injectable } from '@angular/core';
import {Department} from "./domain/Department";
import {Reservation} from "./domain/Reservation";
import {User} from "./domain/User";
import {Desk} from "./domain/Desk";

@Injectable({
  providedIn: 'root'
})

export class DepartmentService {
  public departments: Map<string,Reservation[]> = new Map;

  constructor() {
    this.departments.set("WDS", [new Reservation("25-09-2024", new User("test@test.com", "test", "testicle", "WDS"), new Desk(1, 0))]);
    this.departments.set( "ACPR", [new Reservation("25-09-2024", new User("test@test.com", "test", "testicle", "ACPR"), new Desk(2, 1))])
  }
  getDepartments() : Map<string,Reservation[]>{
    return this.departments;
  }

  getListOfReservatuionsByDepartment(map: Map<string,Reservation[]>,department:string) : Reservation[] {
    let depReservations : Reservation[] = [];
     depReservations =  map.get(department)
    let i : number;
    for ( let depReservation of depReservations) {
      i++
    depReservation.position = i;
    }

    return depReservations;
  }


}

