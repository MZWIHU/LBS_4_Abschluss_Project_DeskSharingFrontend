import {Component, inject, OnInit} from '@angular/core';
import {MatAccordion, MatExpansionModule, MatExpansionPanel, MatExpansionPanelTitle} from "@angular/material/expansion";
import {AdminDepartmentComponent} from "../admin-department/admin-department.component";
import {Department} from "../domain/Department";
import {Reservation} from "../domain/Reservation";
import {User} from "../domain/User";
import {Desk} from "../domain/Desk";
import {DepartmentService} from "../department.service";

@Component({
  selector: 'app-admin-view',
  standalone: true,
  imports: [
    MatAccordion,
    MatExpansionModule,
    AdminDepartmentComponent,
  ],
  templateUrl: './admin-view.component.html',
  styleUrl: './admin-view.component.css'
})
export  class AdminViewComponent implements OnInit{

  public departments: Department[] = [];
  protected readonly departmentService = inject(DepartmentService);
  ngOnInit(){
     this.departments = this.departmentService.getDepartments();
  }

}
