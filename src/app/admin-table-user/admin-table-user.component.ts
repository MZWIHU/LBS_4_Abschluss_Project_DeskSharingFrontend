import {Component, DestroyRef, HostListener, inject, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef, MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef, MatTable, MatTableDataSource, MatTableModule
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
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {AuthService} from "../service/auth-service.service";

@Component({
  selector: 'app-admin-table-user',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
  ],
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatCheckbox, MatFormField, MatInput, MatLabel],
  templateUrl: './admin-table-user.component.html',
  styleUrl: './admin-table-user.component.css'
})
export class AdminTableUserComponent implements OnInit {
  userDataSource: MatTableDataSource<UserData>;

  dataSource: Map<string, Reservation[]> = new Map();
  columnsToDisplay = ['name', 'department', 'email'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Reservation | null;
  displayedColumns: string[] = ['select', 'desk', 'floor', 'date'];
  reservationService: ReservationService = inject(ReservationService);
  departmentService: DepartmentService = inject(DepartmentService);
  destroyRef: DestroyRef = inject(DestroyRef);
  reservations: Map<string, Reservation[]> = new Map();
  res: Reservation[] =  [];
  private authService: AuthService = inject(AuthService);


  selection = new SelectionModel<Reservation>(true);


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
        this.userDataSource = new MatTableDataSource(temp);
        //console.log(this.userDataSource)
      }
    )
  }

  isAllSelected(data: Reservation[]) {
    //console.log(data)
    this.res = data;
    let numSelected = this.selection.selected.length;
    let numRows = data.length;
    //console.log(this.dataSource.size + " Datasource size")
    //console.log(this.selection.selected.length + " Selection size")
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows(reservations: Reservation[]) {
    //console.log(this.isAllSelected(reservations))
    if (this.isAllSelected(reservations)) {
      this.selection.clear();
      return;
    } else {
      this.selection.select(...reservations);
    }
  }

  checkboxLabel(row?: Reservation): string {
    if (!row) {
      return `${this.isAllSelected(this.res) ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`
  }

  delete() {
    // console.log(this.selection.selected)
    this.departmentService.deleteMultipleReservations(this.selection.selected);
  }

  applyFilter(event: Event) {
    /*if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }*/

    const filterValue = (event.target as HTMLInputElement).value;
    //console.log(filterValue)
    //console.log(this.dataSource)
    this.userDataSource.filter = filterValue.trim().toLowerCase();
  }

  clearSelection() {
    console.log("CLEAR")
    this.selection = new SelectionModel<Reservation>(true)
  }
}

export interface UserData {
  email: string,
  name: string,
  department: string
}
