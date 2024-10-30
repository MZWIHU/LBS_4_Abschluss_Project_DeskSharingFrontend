import {Component, inject, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatRipple} from "@angular/material/core";
import {Router, RouterLink} from "@angular/router";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {generate} from "rxjs";
import {MobileService} from "../service/mobile-service.service";
import {SidenavService} from "../service/side-nav.service";

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
export class DesksharingHeaderComponent implements OnInit{

  protected openchart: boolean;
  protected openadmin: boolean;
  show: boolean = true;
  mobile: boolean = false;
  mobileService: MobileService = inject(MobileService)
  sidenavService: SidenavService = inject(SidenavService)

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

  ngOnInit() {
    this.mobile = this.mobileService.mobileCheck();
    this.router.events.subscribe(_ => {
      this.show = this.router.url != "/";
    })
    console.log(this.mobile)
  }

  toggle(){
    this.sidenavService.toggle();
  }
}
