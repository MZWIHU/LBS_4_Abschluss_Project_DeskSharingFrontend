import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCalendar} from "@angular/material/datepicker";
import {MatCard} from "@angular/material/card";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {Reservation} from "../../domain/Reservation";
import {ReservationService} from "../../service/reservation.service";

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatCalendar,
    MatCard,
    MatDialogContent,
    ReactiveFormsModule,
    MatDialogModule
  ],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogComponent {

  private dialogRef: MatDialogRef<DeleteDialogComponent> = inject(MatDialogRef<DeleteDialogComponent>)

  private pass: Reservation = inject(MAT_DIALOG_DATA)

  private reservationService = inject(ReservationService)


  delete() {
    this.reservationService.deleteReservation(this.pass)
    this.closeDialog()
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
