import {DestroyRef, inject, Injectable} from '@angular/core';
import {Reservation} from "../domain/Reservation";
import {MatTableDataSource} from "@angular/material/table";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class DepartmentService {
  public dataSource: MatTableDataSource<Reservation> = new MatTableDataSource<Reservation>();

  destroyRef: DestroyRef = inject(DestroyRef)

  constructor(private http: HttpClient) {

  }

  setDatasource(dataSource: MatTableDataSource<Reservation>) {
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

  getReservations(): Observable<Map<string, Reservation[]>> {
    const headers: HttpHeaders = new HttpHeaders();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");
    return this.http.get<Map<string, Reservation[]>>('http://localhost:8090/getalladminreservation');
  }


}

