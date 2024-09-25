import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LandingpageComponent} from "./landingpage/landingpage.component";
import {AdminViewComponent} from "./admin-view/admin-view.component";


export const routes: Routes = [
  {path: '', component: LandingpageComponent},
  {path: 'admin', component:AdminViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
