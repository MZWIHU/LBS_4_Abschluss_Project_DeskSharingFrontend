import {Component, inject} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatRipple} from "@angular/material/core";
import {Router, RouterLink} from "@angular/router";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {generate} from "rxjs";

//import {KeycloakService} from "../service/keycloak.service";

@Component({
  selector: 'desksharing-header',
  standalone: true,
  imports: [
    MatToolbarModule, MatButtonModule, MatIconModule, MatRipple, RouterLink, MatMenuTrigger, MatMenu, MatMenuItem
  ],
  templateUrl: './desksharing-header.component.html',
  styleUrl: './desksharing-header.component.scss'
})
export class DesksharingHeaderComponent {

  protected openchart: boolean;
  protected openadmin: boolean;

  constructor(private router: Router) {

    router.events.subscribe(_ => {
      //console.log(router.url);
      this.openchart = router.url.startsWith("/admin");
      this.openadmin = router.url.startsWith("/chart");

    });


  }
  admin(){
    this.router.navigate([("admin")]);
  }

  statistics() {
    this.router.navigate([("chart")]);
  }

  protected readonly generate = generate;
  protected readonly webkitURL = webkitURL;
  protected readonly Location = Location;
}
