import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
//import {ReservationService} from "../service/reservation-service.service";
import {Reservation} from "../domain/Reservation";
import {MatDialog} from "@angular/material/dialog";
//import {EditDialogComponent} from "../edit-dialog/edit-dialog.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {EditDialogComponent} from "../edit-dialog/edit-dialog.component";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";
import {ReservationService} from "../service/reservation.service";

//import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-reservation-overview',
  standalone: true,
  imports: [
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    MatHeaderRow,
    MatTable,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './reservation-overview.component.html',
  styleUrl: './reservation-overview.component.css'
})
export class ReservationOverviewComponent implements OnInit {

  destroyRef: DestroyRef = inject(DestroyRef)
  reservationService: ReservationService = inject(ReservationService);
  displayedColumns: string[] = ['desk', 'floor', 'date', 'action'];
  dialog: MatDialog = inject(MatDialog)
  dataSource: Reservation[];

  ngOnInit() {

    this.getData('');
    this.dialog.afterAllClosed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(_ => {
      this.getData('')
    })
  }

  getData(mail: string) {
    this.reservationService.getReservationByUserMail("test@test.com").pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        response => {
          this.dataSource = response;
          console.log(response)
        })
  }

  delete(reservation: Reservation) {
    console.log(reservation)
    //this.reservationService.deleteReservation(reservation)
    this.openDeleteDialog(reservation)
  }

  editEntry(reservation: Reservation) {
    console.log(reservation)
    this.openEditDialog(reservation)
  }

  openEditDialog(reservation: Reservation): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: reservation
    });
  }

  openDeleteDialog(reservation: Reservation): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: reservation
    });
  }
}
