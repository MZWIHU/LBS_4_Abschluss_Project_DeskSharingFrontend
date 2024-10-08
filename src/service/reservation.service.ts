import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DestroyRef, inject, Injectable} from '@angular/core';
import {Reservation} from "../app/domain/Reservation";
import {User} from "../app/domain/User";
import {Desk} from "../app/domain/Desk";
import {Observable} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {


  destroyRef: DestroyRef = inject(DestroyRef)

  constructor(private http: HttpClient) {

  }


  getReservation(targetID: number, floor: number): Observable<Reservation[]> {
    const headers: HttpHeaders = new HttpHeaders();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");


    return this.http.get<Reservation[]>('http://localhost:8090/getreservationfordesk?deskID=' + targetID + "&floor=" + floor, {headers})
  }

  makeReservation(date: Date,  floor: number, deskID: number) {
    const headers: HttpHeaders = new HttpHeaders();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");


    let request = new Reservation(date.toDateString(),
      new User("test@test.com", "Martin", "TEST", "ACPR")
      , new Desk(deskID, floor));

    //this.http.post("https://desksharing.onrender.com/reservation", request, {headers}).subscribe(
      this.http.post("http://localhost:8090/createreservation", request, {headers}).subscribe(
      response => {
        window.location.reload()
        //console.log(response)
      }
    )
  }

  getReservationByUserMail(userMail: string): Observable<Reservation[]> {
    const headers: HttpHeaders = new HttpHeaders();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");


    //this.http.post("https://desksharing.onrender.com/userReservations?userMail=", request, {headers}).subscribe(
    return this.http.get<Reservation[]>("http://localhost:8090/getreservationbyuser?userMail=" + userMail, {headers})
  }

  updateReservation(reservation: Reservation){
    const headers: HttpHeaders = new HttpHeaders();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");

    console.log("SEND")
     this.http.put("http://localhost:8090/updatereservation", reservation, { headers }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
    //this.http.put("https://desksharing.onrender.com/reservation", reservation, { headers }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
      _ =>{}
    )

  }

  getReservationsByFloor(floor: number) {
    let reservations: Reservation[];
    const headers: HttpHeaders = new HttpHeaders();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");

    //this.http.post("https://desksharing.onrender.com/reservation", request, {headers}).subscribe(
    return this.http.get<Reservation[]>("http://localhost:8090/getreservationsbyfloor?floor=" + floor, {headers})
    //return this.http.get<Reservation[]>("https://desksharing.onrender.com/reservations-by-floor?floor=" + floor, {headers})
  }

  deleteReservation(reservation: Reservation)  {
    const headers: HttpHeaders = new HttpHeaders();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");

    //return this.http.post("http://localhost:8090/deleteReservation", reservation, { headers })
    return this.http.post("https://desksharing.onrender.com/deleteReservation", reservation, { headers })
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe( _ =>{})
  }
}
