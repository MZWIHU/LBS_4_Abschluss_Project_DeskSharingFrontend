import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef, MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef, MatTable, MatTableModule
} from "@angular/material/table";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatCheckbox} from "@angular/material/checkbox";
import {SelectionModel} from "@angular/cdk/collections";
import {Reservation} from "../domain/Reservation";
import {ReservationService} from "../service/reservation.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-admin-table-user',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatCheckbox],
  templateUrl: './admin-table-user.component.html',
  styleUrl: './admin-table-user.component.css'
})
export class AdminTableUserComponent implements OnInit{
  userDataSource : UserData[] = [];
  dataSource : Map<string, Reservation[]> = new Map();
  columnsToDisplay = ['name', 'department', 'email', 'symbol', 'position'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Reservation | null;
  displayedColumns: string[] = ['desk', 'floor', 'date', 'action'];
  reservationService: ReservationService = inject(ReservationService);
  destroyRef: DestroyRef = inject(DestroyRef);

  selection = new SelectionModel<Reservation>(true, []);

  ngOnInit() {

    this.reservationService.getAllReservationsByUser().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(resp => {

        resp.forEach((value, key) => {
          this.userDataSource.push({
            name: value.at(0).user.name + " " + value.at(0).user.surname,
            department: value.at(0).user.department,
            email: key
          })
        })
      }
    )
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.size;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows(reservations: Reservation[]) {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...reservations);
  }

  checkboxLabel(row?: Reservation): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`
  }

}

export interface UserData {
  email: string,
  name: string,
  department: string
}
