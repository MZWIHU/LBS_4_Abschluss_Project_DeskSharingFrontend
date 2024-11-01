import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatCheckbox} from "@angular/material/checkbox";
import {SelectionModel} from "@angular/cdk/collections";
import {DepartmentService} from "../service/department.service";
import {Reservation} from "../domain/Reservation";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatButton} from "@angular/material/button";
import {AuthService} from "../service/auth-service.service";

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
    MatHeaderCellDef,
    MatNoDataRow,
    MatButton
  ],
  templateUrl: './admin-table.component.html',
  styleUrl: './admin-table.component.css'
})
export class AdminTableComponent implements OnInit {
  protected readonly departmentService = inject(DepartmentService);
  reservations: Map<string, Reservation[]> = new Map();
  dataSource = this.departmentService.dataSource;
  private destroyRef: DestroyRef = inject(DestroyRef);
  displayedColumns: string[] = ['select', 'desk', 'date', 'user'];
  selection = new SelectionModel<Reservation>(true);
  private authService: AuthService = inject(AuthService);


  ngOnInit() {
    this.reservations = new Map<string, Reservation[]>();
    this.departmentService.getReservations().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
      this.reservations = new Map(Object.entries(data));
      let temp = this.reservations.keys().next().value;
      let tempRes: Reservation[] = [];
      //if (this.reservations.get(temp)?.length > 0){
      for (let res of this.reservations.get(temp)) {
        res.position++;
        tempRes.push(res);
      }
    });
    this.dataSource = this.departmentService.dataSource;
    //console.log(this.dataSource)
  }

  isAllSelected() {
    let numSelected = this.selection.selected.length;
    let numRows = this.departmentService.dataSource.data.length;
    //  console.log(this.departmentService.selection.selected)
    // console.log(numSelected === numRows)
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    //console.log(this.isAllSelected())
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    } else {
      //console.log(this.departmentService.dataSource.data)

      this.selection.select(...this.departmentService.dataSource.data);

    }
  }

  checkboxLabel(row?: Reservation): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`
  }

  delete() {
    // console.log(this.selection.selected)
    this.departmentService.deleteMultipleReservations(this.selection.selected);
  }

}
