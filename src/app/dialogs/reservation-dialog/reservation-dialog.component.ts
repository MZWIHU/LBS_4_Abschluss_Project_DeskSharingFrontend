import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ReservationService} from "../../service/reservation.service";
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";
import {MatCard} from "@angular/material/card";
import {MatCalendar, MatDatepickerInput} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from "@angular/material/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {DialogData} from "../../domain/DialogData";
import {AuthService} from "../../service/auth-service.service";


@Component({
  selector: 'app-popup',
  standalone: true,
  templateUrl: './reservation-dialog.component.html',
  imports: [
    ReactiveFormsModule,
    MatButton,
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatDialogActions,
    MatCard,
    MatCalendar,
    MatDatepickerInput,
    MatTabGroup,
    MatTab
  ],
  providers: [provideNativeDateAdapter()],
  styleUrl: './reservation-dialog.component.css'
})
export class ReservationDialogComponent implements OnInit {

  private reservationService: ReservationService = inject(ReservationService);

  private dialogRef: MatDialogRef<ReservationDialogComponent> = inject(MatDialogRef<ReservationDialogComponent>);

  private pass: DialogData = inject(MAT_DIALOG_DATA);

  private authService: AuthService = inject(AuthService);


  public disabled: Date[] = []

  ngOnInit(): void {
    //  console.log("INIT")
    //console.log(this.pass.reservations)

    for (let reservation of this.pass.reservations) {
      this.disabled.push(new Date(reservation.date));
    }

    console.log(this.disabled)
  }

  dateInputForm = new FormGroup({
    date: new FormControl<Date>(null, [
      Validators.required
    ])
  })


  onSubmit() {
    //   console.log("submit")
    console.log(this.dateInputForm.controls.date.value + "AT SUBMIT")
    this.makeReservation(this.dateInputForm.controls.date.value, +this.pass.floor, this.pass.deskID);
    this.dialogRef.close();

  }


  makeReservation(date: Date, floor: number, deskID: number) {
    //console.log(!this.dateInputForm.valid)
    //console.log(this.dateInputForm.get('fromDate').value.toLocaleDateString())
    this.reservationService.makeReservation(date, floor, deskID)

  }

  updateFormDate(value: any) {
    this.dateInputForm.get('date').setValue(value);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  //function to disable dates that are already reserved
  disabledDates = (d: Date): boolean => {
    //d.setTime(new Date().getTime())
    const time = d.getDate();
    //console.log(!this.disabled.find(x => x.getDate() == time));
    return !this.disabled.find(x => x.getDate() == time);
  }
}
