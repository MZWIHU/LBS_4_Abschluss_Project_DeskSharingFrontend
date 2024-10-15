import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LandingpageComponent} from "./landingpage/landingpage.component";
import {AdminViewComponent} from "./admin-view/admin-view.component";
import {FloorComponent} from "./floor/floor.component";
import {ReservationOverviewComponent} from "./reservation-overview/reservation-overview.component";
import {CheckInComponent} from "./check-in/check-in.component";


export const routes: Routes = [
  {path: 'floor/:id', component: FloorComponent},
  {path: '', component: LandingpageComponent},
  {path: 'overview', component: ReservationOverviewComponent},
  {path: 'admin', component: AdminViewComponent},
  {path: 'checkin/floor/:floor/desk/:desk', component: CheckInComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
