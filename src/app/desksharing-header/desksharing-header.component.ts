import {Component, inject} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatRipple} from "@angular/material/core";
import {Router, RouterLink} from "@angular/router";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {generate} from "rxjs";
import {KeycloakService} from "../service/keycloak-service.service";

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
export class DesksharingHeaderComponent{

  keycloakService: KeycloakService = inject(KeycloakService);
  protected open: boolean;

  logout(){
    this.keycloakService.logout();
  }

  constructor(private router: Router) {

    router.events.subscribe(_ => {
      console.log(router.url);
      this.open = !router.url.startsWith("/#state") && router.url == "/admin";

    });



  }
  statistics(){
    this.router.navigate([("statistics")]);
  }
  protected readonly generate = generate;
  protected readonly webkitURL = webkitURL;
  protected readonly Location = Location;
}
