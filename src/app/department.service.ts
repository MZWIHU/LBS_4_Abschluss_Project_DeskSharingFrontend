import { Injectable } from '@angular/core';
import {Department} from "./domain/Department";
import {Reservation} from "./domain/Reservation";
import {User} from "./domain/User";
import {Desk} from "./domain/Desk";

@Injectable({
  providedIn: 'root'
})

export class DepartmentService {
  public departments: Department[] = [];

  constructor() {
    this.departments.push(new Department("WDS", [new Reservation("25-09-2024", new User("test@test.com", "test", "testicle", "WDS"), new Desk(1, 0))]),
      new Department("ACPR", [new Reservation("25-09-2024", new User("test@test.com", "test", "testicle", "ACPR"), new Desk(2, 1))]))
  }
  getDepartments() : Department[]{
    return this.departments;
  }
}

