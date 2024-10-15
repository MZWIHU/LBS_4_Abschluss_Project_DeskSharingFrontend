import {User} from './User';
import {Desk} from "./Desk";
import {fakeAsync} from "@angular/core/testing";

/*
class representing a reservation
 */
export class Reservation {


  constructor(date: string, user : User, desk: Desk) {
    this.date = date;
    this.user = user;
    this.desk = desk;
    this.checkedin = false;
  }


   _id : any;

   mongoID : string;

   position : number;

  date : string;

  user : User;

  desk : Desk;

  checkedin : boolean;

}
