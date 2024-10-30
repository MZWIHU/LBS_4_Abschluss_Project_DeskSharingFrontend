import {AfterViewInit, Component, inject, ViewChild} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {DesksharingHeaderComponent} from "./desksharing-header/desksharing-header.component";
import {HttpClientModule} from "@angular/common/http";
import {MatDivider} from "@angular/material/divider";
import {MatDrawerMode, MatSidenav, MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MobileService} from "./service/mobile-service.service";
import {SidenavService} from "./service/side-nav.service";
import {KeycloakService} from "./service/keycloak-service.service";

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
export class AppComponent implements AfterViewInit{
  open: boolean = false;
  title = "desksharingFrontEnd";
  numberOfFloors: number = 4;
  numberOfFloorsCollection: number[] = []
  previousRoute: string = "";
  mode: MatDrawerMode;
  mobileService: MobileService = inject(MobileService)
  sidenavService: SidenavService = inject(SidenavService)
  keycloakService: KeycloakService = inject(KeycloakService);

  width = "15%"
  @ViewChild('sidenav') public sidenav: MatSidenav;


  constructor(private router: Router) {


    this.mobileService.mobileCheck() ? this.mode = "over" : this.mode = "side" ;
    this.mobileService.mobileCheck() ? this.width = "25%" : this.width = "12%" ;
    this.mobileService.mobileCheck() ? this.open = false : this.open = true ;
    router.events.subscribe(_ => {
      this.open = router.url != "/";
    })

    router.events.subscribe(_ => {
      //console.log(router.url);
      this.open = !router.url.startsWith("/#state") && router.url != "/"
        && !router.url.includes("/checkin")
        && !router.url.includes("/admin")
        && !router.url.includes("/chart")
        && !this.mobileService.mobileCheck();
      //console.log(!router.url.startsWith("/#state"))
      //console.log(this.open)
    })

    for (let i = 1; i <= this.numberOfFloors; i++) {
      this.numberOfFloorsCollection.push(i)
    }
  }

  ngAfterViewInit() {
    this.sidenavService.setSidenav(this.sidenav);
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([uri])
    });
  }
}
