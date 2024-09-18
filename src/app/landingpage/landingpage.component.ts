import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";

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
export class LandingpageComponent {
  user = 'Martin';
}
