import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatCheckbox} from "@angular/material/checkbox";
import {SelectionModel} from "@angular/cdk/collections";
import {DepartmentService} from "../department.service";
import {Reservation} from "../domain/Reservation";

@Component({
  selector: 'app-admin-table',
  standalone: true,
  imports: [
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
    MatHeaderCellDef
  ],
  templateUrl: './admin-table.component.html',
  styleUrl: './admin-table.component.css'
})
export class AdminTableComponent implements OnInit {
  protected readonly departmentService = inject(DepartmentService);
  reservations: Map<string, Reservation[]> = new Map<string, Reservation[]>();

  dataSource = this.departmentService.dataSource;

  ngOnInit() {
    this.departmentService.getReservations().subscribe(data =>{
       this.reservations = data.reservations;
    });
    let temp = this.reservations.keys().next().value;
    let tempRes: Reservation[] = [];
    if (this.reservations.get(temp).length > 1){
      for (let res of this.reservations.get(temp)) {
        res.position = 1;
        tempRes.push(res);
      }
    }

    this.dataSource = new MatTableDataSource<Reservation>(tempRes);
    this.departmentService.setDatasource(this.dataSource)
  }

  displayedColumns: string[] = ['select', 'desk', 'date', 'user'];

  selection = new SelectionModel<Reservation>(true, []);

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
