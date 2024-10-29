import {Component, DestroyRef, inject, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatPaginator} from "@angular/material/paginator";
import {ReservationService} from "../service/reservation.service";
import {Reservation} from "../domain/Reservation";
import {MatSort} from "@angular/material/sort";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-where-is',
  standalone: true,
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatInput,
    MatLabel,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    MatNoDataRow
  ],
  templateUrl: './where-is.component.html',
  styleUrl: './where-is.component.css'
})
export class WhereIsComponent implements OnInit{

  displayedColumns: string[] = ['desk', 'date', 'user'];
  private reservationService: ReservationService = inject(ReservationService);
  private destroyRef: DestroyRef = inject(DestroyRef)
  reservations: Reservation[] = [];
  dataSource: MatTableDataSource<Reservation>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  ngOnInit() {
    this.reservationService.getAllReservationsForToday().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(resp => {
      this.dataSource = new MatTableDataSource<Reservation>(resp);
    })
  }

  applyFilter(event: Event) {
    /*if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }*/

    const filterValue = (event.target as HTMLInputElement).value;
    //console.log(filterValue)
    //console.log(this.dataSource)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
