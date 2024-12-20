import {Component, DestroyRef, inject} from '@angular/core';
import {Reservation} from "../domain/Reservation";
import {switchMap} from "rxjs";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ReservationService} from "../service/reservation.service";
import {MatDialog} from "@angular/material/dialog";
import {ReservationDialogComponent} from "../dialogs/reservation-dialog/reservation-dialog.component";
import {AuthService} from "../service/auth-service.service";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.svg',
  styleUrl: './map.component.css'
})
export class MapComponent {
  floor: string;
  amountOfDesks = 39;
  reserved = "#ff0000";
  free = "#61ff00";
  fill: string[] = []
  private reservationService: ReservationService = inject(ReservationService);
  public dialog: MatDialog = inject(MatDialog);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private authService: AuthService = inject(AuthService);
  reservations: string[] = [];


  constructor() {
    this.getCurrentFloor()
    for (let i = 0; i < this.amountOfDesks; i++) {
      this.fill.push(this.free)
      this.reservations.push(i + 1 + "");
    }
    this.getReservationsByFloor(+this.floor)
  }

  openDialog(deskID: number, reservations: Reservation[]): void {
    const dialogRef = this.dialog.open(ReservationDialogComponent, {
      data: {
        floor: this.floor,
        deskID: deskID,
        reservations: reservations
      }
    });
  }

  //gets the floor currently on from the url path
  getCurrentFloor() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        (params.get('id')!))
    ).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(path => {
      this.floor = path;
    })
  }

  onDeskClick(id: string) {
    //console.log("funktioniert")
    // console.log(rect)
    // console.log('Desk clicked:', target.id);
    let response = this.reservationService.getReservation(+id, +this.floor)
    response.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(response => {
        this.openDialog(+id, response);
      }
    )
  }

  getReservationsByFloor(floor: number) {
    this.reservationService.getReservationsByFloor(floor).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(response => {
        for (let reservation of response) {
          this.fill[reservation.desk.deskID - 1] = this.reserved;
          this.reservations[(reservation.desk.deskID) -1] = reservation.user.username;
        }
      });
  }
}
