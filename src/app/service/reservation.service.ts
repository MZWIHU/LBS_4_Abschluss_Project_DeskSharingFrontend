import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DestroyRef, inject, Injectable} from '@angular/core';
import {Reservation} from "../domain/Reservation";
import {Observable} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {User} from "../domain/User";
import {Desk} from "../domain/Desk";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {


  destroyRef: DestroyRef = inject(DestroyRef)
  url: string = "https://desksharing-backend-keycloak-rmv.onrender.com"

  headers: HttpHeaders = new HttpHeaders();
  http : HttpClient = inject(HttpClient)

  getReservation(targetID: number, floor: number): Observable<Reservation[]> {
    this.headers = this.headers.set("Authorization", "Bearer " + localStorage.getItem("token"))
    this.headers = this.headers.set("Content-Type", "application/json");
    this.headers = this.headers.set("Accept", "application/json");
    return this.http.get<Reservation[]>(this.url + '/getreservationsfordesk?deskId=' + targetID + "&floor=" + floor, {headers: this.headers})
  }

  makeReservation(date: Date, floor: number, deskID: number) {
    this.headers = this.headers.set("Authorization", "Bearer " + localStorage.getItem("token"))
    this.headers = this.headers.set("Content-Type", "application/json");
    this.headers = this.headers.set("Accept", "application/json");
    let request = new Reservation(date.toDateString(),
      new User(localStorage.getItem("email"), localStorage.getItem("firstName"), localStorage.getItem("lastName"), localStorage.getItem("username"), localStorage.getItem("department"))
      , new Desk(deskID, floor));

    //this.http.post("https://desksharing.onrender.com/reservation", request, {headers}).subscribe(
    this.http.post(this.url + "/createreservation", request, {headers: this.headers}).subscribe(
      response => {
        window.location.reload()
        //console.log(response)
      }
    )
  }

  getReservationByUserMail(userMail: string): Observable<Reservation[]> {
    this.headers = this.headers.set("Authorization", "Bearer " + localStorage.getItem("token"))
    this.headers = this.headers.set("Content-Type", "application/json");
    this.headers = this.headers.set("Accept", "application/json");
    return this.http.get<Reservation[]>(this.url + "/getreservationbyuser?userMail=" + userMail, {headers: this.headers})
  }

  updateReservation(reservation: Reservation) {
    this.headers = this.headers.set("Authorization", "Bearer " + localStorage.getItem("token"))
    this.headers = this.headers.set("Content-Type", "application/json");
    this.headers = this.headers.set("Accept", "application/json");
    //console.log("SEND")
    this.http.put(this.url + "/updatereservation", reservation, {headers: this.headers}).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
      _ => {
      }
    )
  }

  getReservationsByFloor(floor: number) {
    this.headers = this.headers.set("Authorization", "Bearer " + localStorage.getItem("token"))
    this.headers = this.headers.set("Content-Type", "application/json");
    this.headers = this.headers.set("Accept", "application/json");
    return this.http.get<Reservation[]>(this.url + "/getreservationsbyfloor?floor=" + floor, {headers: this.headers})
  }

  deleteReservation(reservation: Reservation) {
    //console.log("Delete")
    this.headers = this.headers.set("Authorization", "Bearer " + localStorage.getItem("token"))
    this.headers = this.headers.set("Content-Type", "application/json");
    this.headers = this.headers.set("Accept", "application/json");
    return this.http.delete(this.url + "/deletereservation", {headers: this.headers, body: reservation})
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe(_ => {
      })
  }

  getReservationsByDesk(floor: string, desk: string) {
    this.headers = this.headers.set("Authorization", "Bearer " + localStorage.getItem("token"))
    this.headers = this.headers.set("Content-Type", "application/json");
    this.headers = this.headers.set("Accept", "application/json");
    return this.http.get<Reservation>(this.url + "/getreservationsfordesk?floor=" + floor + "&deskId=" + desk, {headers: this.headers});
  }

  getReservationByDesk(floor: string, desk: string) {
    this.headers = this.headers.set("Authorization", "Bearer " + localStorage.getItem("token"))
    this.headers = this.headers.set("Content-Type", "application/json");
    this.headers = this.headers.set("Accept", "application/json");
    return this.http.get<Reservation>(this.url + "/getreservationfordesk?floor=" + floor + "&deskId=" + desk, {headers: this.headers});
  }

  checkIn(reservation: Reservation) {
    this.headers = this.headers.set("Authorization", "Bearer " + localStorage.getItem("token"))
    this.headers = this.headers.set("Content-Type", "application/json");
    this.headers = this.headers.set("Accept", "application/json");
    console.log("SEND")
    return this.http.post(this.url + "/checkin", reservation, {headers: this.headers}).pipe(takeUntilDestroyed(this.destroyRef));

  }

  getAllReservationsByUser() {
    this.headers = this.headers.set("Authorization", "Bearer " + localStorage.getItem("token"))
    this.headers = this.headers.set("Content-Type", "application/json");
    this.headers = this.headers.set("Accept", "application/json");
    return this.http.get<Map<string, Reservation[]>>(this.url + "/getallreservationbyusers", {headers: this.headers});
  }

  getAllReservationsForToday() {
    this.headers = this.headers.set("Authorization", "Bearer " + localStorage.getItem("token"))
    this.headers = this.headers.set("Content-Type", "application/json");
    this.headers = this.headers.set("Accept", "application/json");
    console.log(this.headers)
    return this.http.get<Reservation[]>(this.url + "/getallresvationsfortoday", {headers: this.headers});
  }
}
