/*
Definition class for a desk in the office
 */

export class Desk {
  public deskID : number;
  public floor: number;

  constructor(deskID: number, floor: number) {
    this.deskID = deskID;
    this.floor = floor;
  }
}
