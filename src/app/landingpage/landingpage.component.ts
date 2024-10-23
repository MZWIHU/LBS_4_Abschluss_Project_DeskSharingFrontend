import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {AuthService} from "../service/auth-service.service";
import {UserProfile} from "../domain/Userprofile";

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [
    RouterLink,
    MatButton
  ],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent implements OnInit {
  authService: AuthService = inject(AuthService);
  roles: string[] = [];
  userInfo: UserProfile = new UserProfile();
  user: string;

  ngOnInit() {
    this.userInfo = this.authService.getInfo();
    this.roles = this.authService.getRoles();
    this.user = this.userInfo.firstName;
    //console.log(this.roles.includes("admin"))
  }

}
