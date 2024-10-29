import {Component} from '@angular/core';
import {QrCodeModule} from "ng-qrcode";

@Component({
  selector: 'app-qr-codegen',
  standalone: true,
  imports: [
    QrCodeModule
  ],
  templateUrl: './qr-codegen.component.html',
  styleUrl: './qr-codegen.component.css'
})
export class QrCodegenComponent {
  floor: string
  numberofdesks: number[];
  /*
  constructor(floor: string){
    this.floor = floor;
    for (let i = 1;i < 40; i++){
    this.numberofdesks[i] = i
    }
  }
*/

}
