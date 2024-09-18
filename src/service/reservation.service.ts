import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DestroyRef, inject, Injectable} from '@angular/core';
import {Reservation} from "../app/domain/Reservation";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {


  destroyRef: DestroyRef = inject(DestroyRef)

  constructor(private http: HttpClient) {

  }

  getReservation(targetID: number, floor: number) {
  }

  makeReservation(date: Date,  floor: number, deskID: number) {

  }

  getReservationByUserMail(userMail: string){

  }

  updateReservation(reservation: Reservation){

  }

  getReservationsByFloor(floor: number) {

  }

  deleteReservation(reservation: Reservation)  {

  }
}
