import {User} from './User';
import {Desk} from "./Desk";

/*
class representing a reservation
 */
export class Reservation {
  constructor(date: string, user : User, desk: Desk) {
    this.date = date;
    this.user = user;
    this.desk = desk;
  }


  public _id: any;

  public mongoID: string;

  public date: string;

  public user : User;

  public desk : Desk;

}
