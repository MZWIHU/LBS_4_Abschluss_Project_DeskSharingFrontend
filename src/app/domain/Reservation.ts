import {User} from './User';
import {Desk} from "./Desk";

/*
class representing a reservation
 */
export interface Reservation {

  /*
  constructor(date: string, user : User, desk: Desk) {
    this.date = date;
    this.user = user;
    this.desk = desk;
  }

*/
   _id : any;

   mongoID : string;

   position : number;

  date : string;

  user : User;

  desk : Desk;

}
