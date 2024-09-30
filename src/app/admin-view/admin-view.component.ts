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
export  class AdminViewComponent implements OnInit{
  protected readonly departmentService = inject(DepartmentService);
  department: string;
  map : Map<string,Reservation[]> = this.departmentService.getDepartments();
  dataSource: MatTableDataSource<Reservation> = new MatTableDataSource<Reservation>(this.map.values().next().value);


  ngOnInit(){



  }
  getDepartmentOnclick(department :string){
    this.department = department
    this.dataSource = new MatTableDataSource(this.map.get(department));
  }

  displayedColumns: string[] = ['select','desk', 'date', 'user'];

  selection = new SelectionModel<Reservation>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.map.get(this.department).length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    //this.selection.select(...this.dataSource.data);
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
