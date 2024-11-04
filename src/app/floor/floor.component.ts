import {Component, DestroyRef, inject, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ReservationDialogComponent} from "../dialogs/reservation-dialog/reservation-dialog.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {ActivatedRoute, ParamMap, RouterLink} from "@angular/router";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {MatToolbarRow} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";
import {switchMap} from "rxjs";
import {Reservation} from "../domain/Reservation";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MapComponent} from "../map/map.component";
import {ReservationService} from "../service/reservation.service";
import {AuthService} from "../service/auth-service.service";

@Component({
  selector: 'app-floor',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MatToolbarRow,
    MatButton,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MapComponent,
    MatDialogModule
  ],
  templateUrl: './floor.component.html',
  styleUrl: './floor.component.css'
})

export class FloorComponent {

  path = "";
  safePath: SafeResourceUrl = "";
  floor: string;
  displayedColumns: string[] = ['desk', 'date', 'user', 'checkedin'];
  reservations: Reservation[] = [];
  dataSource: MatTableDataSource<Reservation>;
  svg: Object = "";
  private reservationService: ReservationService = inject(ReservationService);
  public dialog: MatDialog = inject(MatDialog);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private sanitizer: DomSanitizer = inject(DomSanitizer);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private authService: AuthService = inject(AuthService);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //@ViewChild('svgObject') svgObject: ElementRef;

  constructor() {
    this.getCurrentFloor()
    this.changeFloor();
    this.getReservationsByFloor(+this.floor)
    //console.log(this.reservations)
  }

  getPath() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.path);
  }

  //opens the dialog and passes the necessary data to it
  openDialog(deskID: number, reservations: Reservation[]): void {
    const dialogRef = this.dialog.open(ReservationDialogComponent, {
      data: {
        floor: this.floor,
        deskID: deskID,
        reservations: reservations
      },
    });
  }

  //gets the floor currently on from the url path
  getCurrentFloor() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        (params.get('id')!))
    ).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(path => {
      this.floor = path;
      this.path = this.path = "assets/floor" + path + ".svg";
    })
  }

  //used to change the svg, reload variable used to prevent infinite loop
  changeFloor() {
    this.safePath = this.getPath();
    //console.log(this.safePath);
  }

  onDeskClick(target: any) {
    // console.log(rect)
    if (target.id != null && target.id != "") {
      // console.log('Desk clicked:', target.id);
      let response = this.reservationService.getReservation(target.id, +this.floor)
      response.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(response => {
          this.openDialog(target.id, response);
        }
      )
    }
  }

  //gets reservation of the floor the view is on
  getReservationsByFloor(floor: number) {
    this.reservationService.getReservationsByFloor(floor).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(response => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data, filter) => {
          const dataStr = data.date + data.desk.deskID + data.user.name + data.user.surname;
          return dataStr.trim().toLowerCase().indexOf(filter) != -1;
        }
      });
  }

  //function for filtering in the table
  applyFilter(event: Event) {
    /*if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }*/

    const filterValue = (event.target as HTMLInputElement).value;
    //console.log(filterValue)
    //console.log(this.dataSource)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
