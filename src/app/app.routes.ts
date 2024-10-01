import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LandingpageComponent} from "./landingpage/landingpage.component";
import {AdminViewComponent} from "./admin-view/admin-view.component";
import {FloorComponent} from "./floor/floor.component";


export const routes: Routes = [
  {path: 'floor/:id', component: FloorComponent},
  {path: '', component: LandingpageComponent},
  {path: 'admin', component: AdminViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
