import {DestroyRef, inject, Injectable} from '@angular/core';
import {Reservation} from "../domain/Reservation";
import {MatTableDataSource} from "@angular/material/table";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {SelectionModel} from "@angular/cdk/collections";

@Injectable({
  providedIn: 'root'
})

export class DepartmentService {
  public dataSource: MatTableDataSource<Reservation> = new MatTableDataSource<Reservation>();
  public selection =  new SelectionModel<Reservation>(true, []);
  destroyRef: DestroyRef = inject(DestroyRef)
  url: string = "https://desksharing-backend.onrender.com"
  private http: HttpClient = inject(HttpClient)


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
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + sessionStorage.getItem("token"))
    headers = headers.set("Content-Type", "application/json");
    headers = headers.set("Accept", "application/json");
    return this.http.get<Map<string, Reservation[]>>(this.url + '/getalladminreservation', {headers});
  }


  deleteMultipleReservations(reservations: Reservation[]) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + sessionStorage.getItem("token"))
    headers = headers.set("Content-Type", "application/json");
    headers = headers.set("Accept", "application/json");
    if (reservations.length > 0) {
      this.http.delete(this.url + "/deletemultiplereservations", {body: reservations, headers: headers})
        .pipe(takeUntilDestroyed(this.destroyRef)).subscribe(_ => {
        window.location.reload()
      });
    }
  }
}

