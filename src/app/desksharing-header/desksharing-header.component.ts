import {Component, inject, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatRipple} from "@angular/material/core";
import {RouterLink} from "@angular/router";
//import {KeycloakService} from "../service/keycloak.service";

@Component({
  selector: 'desksharing-header',
  standalone: true,
  imports: [
    MatToolbarModule, MatButtonModule, MatIconModule, MatRipple, RouterLink
  ],
  templateUrl: './desksharing-header.component.html',
  styleUrl: './desksharing-header.component.scss'
})
export class DesksharingHeaderComponent{

  //keycloakService: KeycloakService = inject(KeycloakService);

  logout(){
   // this.keycloakService.logout();
  }

}
