import {DestroyRef, inject, Injectable} from '@angular/core';
import {Department} from "./domain/Department";
import {Reservation} from "./domain/Reservation";
import {User} from "./domain/User";
import {Desk} from "./domain/Desk";
import {MatTableDataSource} from "@angular/material/table";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AdminReservationResponse} from "./domain/AdminReservationResponse";

@Injectable({
  providedIn: 'root'
})

export class DepartmentService {
  public dataSource : MatTableDataSource<Reservation> = new MatTableDataSource<Reservation>();

  destroyRef: DestroyRef = inject(DestroyRef)

  constructor(private http: HttpClient) {

  }
  setDatasource(dataSource :MatTableDataSource<Reservation>){
    this.dataSource = dataSource

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
  getReservations(): Observable<AdminReservationResponse> {
    const headers: HttpHeaders = new HttpHeaders();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");
    return this.http.get<AdminReservationResponse>('http://localhost:8090/getalladminreservation');
  }



}

