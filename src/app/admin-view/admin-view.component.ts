import {AfterViewInit, Component, inject, Input, OnInit} from '@angular/core';
import {MatAccordion, MatExpansionModule, MatExpansionPanel, MatExpansionPanelTitle} from "@angular/material/expansion";
import {Department} from "../domain/Department";
import {Reservation} from "../domain/Reservation";
import {User} from "../domain/User";
import {Desk} from "../domain/Desk";
import {DepartmentService} from "../department.service";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatCheckbox} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-admin-view',
  standalone: true,
  imports: [
    MatAccordion,
    MatExpansionModule,
    MatCell,
    MatCellDef,
    MatCheckbox,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    FormsModule,
    MatHeaderCellDef,
  ],
  templateUrl: './admin-view.component.html',
  styleUrl: './admin-view.component.css'
})
export class AdminViewComponent implements OnInit {
  protected readonly departmentService = inject(DepartmentService);
  department: string;
  reservations: Map<string, Reservation[]> = this.departmentService.getReservations();
  dataSource = new MatTableDataSource<Reservation>();


  ngOnInit() {
    let temp = this.reservations.keys().next().value;
    let tempRes: Reservation[] = [];
    for (let res of this.reservations.get(temp)) {
      res.position = 1;
      tempRes.push(res);
    }
    this.dataSource = new MatTableDataSource<Reservation>(tempRes);
    console.log(this.dataSource)
  }

  getDepartmentOnclick(department: string) {
    this.department = department;
    this.dataSource = new MatTableDataSource<Reservation>(this.departmentService.getListOfReservationsByDepartment(this.reservations, this.department));
  }

  displayedColumns: string[] = ['select', 'desk', 'date', 'user'];

  selection = new SelectionModel<Reservation>(true, []);

  setDatasource(reservations: Reservation[]) {
    this.dataSource = new MatTableDataSource<Reservation>(reservations);
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: Reservation): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`
  }

  protected readonly Reservation = Reservation;
  protected readonly Map = Map;


}
