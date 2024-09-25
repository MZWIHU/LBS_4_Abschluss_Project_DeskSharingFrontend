import {User} from "./User";
import {Desk} from "./Desk";

export class AdminReservation {
  constructor(position: number,date: string, user : User, desk: Desk) {
    this.position = position
    this.date = date;
    this.user = user;
    this.desk = desk;
  }


  public _id: any;

  public mongoID: string;

  public position: number;

  public date: string;

  public user : User;

  public desk : Desk;

}
