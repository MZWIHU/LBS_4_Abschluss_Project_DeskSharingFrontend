import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {ActivatedRoute, Router} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ReservationService} from "../service/reservation.service";
import {Reservation} from "../domain/Reservation";

@Component({
  selector: 'app-check-in',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './check-in.component.html',
  styleUrl: './check-in.component.css'
})
export class CheckInComponent implements OnInit {

  private reservationService: ReservationService = inject(ReservationService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private destroyRef: DestroyRef = inject(DestroyRef);
  protected floor: string = "";
  protected desk: string = "";
  protected reservation: Reservation;
  protected message: string = "";

  ngOnInit() {
    this.getURLParams()
    this.getReservation(this.floor, this.desk)
  }

  getURLParams() {
    this.floor = this.route.snapshot.paramMap.get('floor');
    this.desk = this.route.snapshot.paramMap.get('desk');

  }

  getReservation(floor: string, desk: string) {
    this.reservationService.getReservationByDesk(floor, desk).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
        if (res.date != null) {
          this.reservation = res;
        } else {
          this.reservation = null;
          console.log("NULL")
        }
      }
    );
  }

  checkIn() {
    let firstName: string = localStorage.getItem('firstName');
    let lastName: string = localStorage.getItem('lastName');
    if (this.reservation != null) {
      if (this.reservation.checkedin == null) {
        console.log(firstName + " " + lastName)
        console.log(this.reservation.user.name + " " + this.reservation.user.surname + " CHECK NAME");

        console.log(firstName + " " + lastName == this.reservation.user.name + " " + this.reservation.user.surname + " CHECK NAME")
        if (firstName + " " + lastName == this.reservation.user.name + " " + this.reservation.user.surname) {
          this.reservationService.checkIn(this.reservation).subscribe(_ => {
            this.router.navigate([""]).then(r => {
            });
          });
        } else {
          this.message = "You did not reserve this table!"
        }
      } else {
        this.message = "Already checked in"
      }
    } else {
      this.message = "Reservation not found!";
    }
  }
}
