import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {Reservation} from "../domain/Reservation";
import {ReservationService} from "../../service/reservation.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCard} from "@angular/material/card";
import {MatCalendar, MatDatepickerInput} from "@angular/material/datepicker";
import {MatButton} from "@angular/material/button";
import {provideNativeDateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatCard,
    MatDatepickerInput,
    MatCalendar,
    MatButton,
    ReactiveFormsModule
  ],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.css',
  providers:[provideNativeDateAdapter()]
})
export class EditDialogComponent {
  private dialogRef: MatDialogRef<EditDialogComponent> = inject(MatDialogRef<EditDialogComponent>)

  private pass: Reservation = inject(MAT_DIALOG_DATA)

  private toUpdate: Reservation;

  constructor(private reservationService: ReservationService) {
    this.toUpdate = this.pass;
  }

  ngOnInit(): void {
    this.toUpdate = this.pass;
  }

  dateUpdateForm = new FormGroup({
    date: new FormControl<Date>(new Date(this.pass.date), [
      Validators.required
    ])
  })


  onSubmit() {
    //this.toUpdate.fromTime = this.dateUpdateForm.controls.fromDate.value;
    this.updateReservation();
    this.dialogRef.close();

  }


  updateReservation() {
    this.toUpdate.date = this.dateUpdateForm.get('date').value.toDateString();
    this.reservationService.updateReservation(this.toUpdate);
  }

  //updates form if the user changes the input
  updateFormDate(value: any) {
    this.dateUpdateForm.get('date').setValue(value);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
