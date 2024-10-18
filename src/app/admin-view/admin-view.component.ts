import {Component, inject, OnInit} from '@angular/core';
import {MatAccordion, MatExpansionModule} from "@angular/material/expansion";
import {Reservation} from "../domain/Reservation";
import {DepartmentService} from "../service/department.service";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatCheckbox} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {AdminTableComponent} from "../admin-table/admin-table.component";

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
    AdminTableComponent,
  ],
  templateUrl: './admin-view.component.html',
  styleUrl: './admin-view.component.css'
})
export class AdminViewComponent implements OnInit {
  protected readonly departmentService = inject(DepartmentService);
  department: string;
  reservations: Map<string, Reservation[]> = new Map();


  ngOnInit() {
    // this.reservations = new Map<string,Reservation[]>
    this.departmentService.getReservations().subscribe(data => {
      this.reservations = new Map(Object.entries(data));
    });
    this.department = this.reservations.keys().next().value;

    let tempRes: Reservation[] = [];
    if (this.reservations.size > 1) {
      for (let res of this.reservations.get(this.department).values()) {
        res.position = 1;
        tempRes.push(res);
      }
    }
    this.departmentService.dataSource = new MatTableDataSource<Reservation>(tempRes);
    console.log("AFTER SUB")
  }

  getDepartmentOnclick(department: string) {
    this.department = department;
    this.departmentService.dataSource = new MatTableDataSource<Reservation>(this.departmentService.getListOfReservationsByDepartment(this.reservations, this.department));
  }

  setDatasource(reservations: Reservation[]) {
    this.departmentService.dataSource = new MatTableDataSource<Reservation>(reservations);
  }


}