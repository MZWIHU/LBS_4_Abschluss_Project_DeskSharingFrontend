import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {DesksharingHeaderComponent} from "./desksharing-header/desksharing-header.component";
import {HttpClientModule} from "@angular/common/http";
import {MatDivider} from "@angular/material/divider";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";

//import {KeycloakService} from "./service/keycloak.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DesksharingHeaderComponent,
    RouterLink,
    HttpClientModule,
    MatDivider,
    MatSidenavModule,
    MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent {
  open: boolean = false;
  title = "desksharingFrontEnd";
  numberOfFloors: number = 4;
  numberOfFloorsCollection: number[] = []
  previousRoute: string = "";


  constructor(private router: Router) {
    router.events.subscribe(_ => {
      //console.log(router.url);
      this.open = !router.url.startsWith("/#state") && router.url != "/"
        && !router.url.includes("/checkin")
        && !router.url.includes("/admin")
        && !router.url.includes("/chart");
      //console.log(!router.url.startsWith("/#state"))
      //console.log(this.open)
    })

    for (let i = 1; i <= this.numberOfFloors; i++) {
      this.numberOfFloorsCollection.push(i)
    }
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([uri])
    });
  }
}
