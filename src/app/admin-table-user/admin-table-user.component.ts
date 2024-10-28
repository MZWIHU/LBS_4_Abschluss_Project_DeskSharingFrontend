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
import {DepartmentService} from "../service/department.service";

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
export class AdminTableUserComponent implements OnInit {
  userDataSource: UserData[] = [];
  dataSource: Map<string, Reservation[]> = new Map();
  columnsToDisplay = ['name', 'department', 'email'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Reservation | null;
  displayedColumns: string[] = ['select', 'desk', 'floor', 'date'];
  reservationService: ReservationService = inject(ReservationService);
  departmentService: DepartmentService = inject(DepartmentService);
  destroyRef: DestroyRef = inject(DestroyRef);
  reservations: Map<string, Reservation[]> = new Map();


  selection = new SelectionModel<Reservation>(true, []);

  ngOnInit() {

    this.reservationService.getAllReservationsByUser().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(resp => {
        this.reservations = new Map(Object.entries(resp));
        this.dataSource = this.reservations;
        // console.log(this.dataSource.get("test@test.com").at(0).user.name + "MAAAAAAAP")
        let temp: UserData[] = [];
        this.reservations.forEach((value, key) => {
          temp.push({
            name: value.at(0).user.name + " " + value.at(0).user.surname,
            department: value.at(0).user.department,
            email: key
          })
        })
        this.userDataSource = temp;
        //console.log(this.userDataSource)
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

  delete() {
    this.departmentService.deleteMultipleReservations(this.selection.selected)
  }
}

export interface UserData {
  email: string,
  name: string,
  department: string
}
