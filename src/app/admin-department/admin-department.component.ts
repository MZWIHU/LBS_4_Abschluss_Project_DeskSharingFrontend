import {Component, inject, OnInit} from '@angular/core';
import {Department} from "../domain/Department";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatTable,
  MatTableDataSource,
  MatTableModule
} from "@angular/material/table";
import {Reservation} from "../domain/Reservation";
import {AdminViewComponent} from "../admin-view/admin-view.component";
import {DepartmentService} from "../department.service";
import {MatCheckbox} from "@angular/material/checkbox";
import {SelectionModel} from "@angular/cdk/collections";
import {AdminReservation} from "../domain/AdminReservation";

@Component({
  selector: 'app-admin-department',
  standalone: true,
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatTableModule,
    MatCheckbox
  ],
  templateUrl: './admin-department.component.html',
  styleUrl: './admin-department.component.css'
})
export class AdminDepartmentComponent implements OnInit{
  displayedColumns: string[] = ['select', 'desk', 'date', 'user'];
  dataSource: MatTableDataSource<Reservation>;
  protected readonly departmentService = inject(DepartmentService);
  public departments: Department[] = [];
  selection = new SelectionModel<Reservation>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

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

  ngOnInit(){
    this.departments = this.departmentService.getDepartments()
    console.log(this.departments)

    this.dataSource = new MatTableDataSource(this.departments.at(0).reservation)

  }


}
