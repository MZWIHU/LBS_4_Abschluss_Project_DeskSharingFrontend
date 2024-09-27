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
  MatHeaderCell,
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
  ],
  templateUrl: './admin-view.component.html',
  styleUrl: './admin-view.component.css'
})
export  class AdminViewComponent implements OnInit, AfterViewInit{

  department: string;
  map : Map<string,Reservation[]>
  protected readonly departmentService = inject(DepartmentService);
  ngOnInit(){
     this.map = this.departmentService.getDepartments();

  //  this.dataSource = new MatTableDataSource(this.map.get(this.depName));
  }

  ngAfterViewInit() {
    console.log(this.department);
    console.log("AAAAAAAAAAAAAAA")
  }
  displayedColumns: string[] = ['select', 'desk', 'date', 'user'];

  dataSource: MatTableDataSource<Department>;
  selection = new SelectionModel<Map<string,Reservation[]>>(true, []);

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

    //this.selection.select(...this.dataSource.data);
  }
  checkboxLabel(row?: Map<string,Reservation[]>): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return null;//`${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row. + 1}`
  }

  protected readonly Reservation = Reservation;
  protected readonly Map = Map;
}
