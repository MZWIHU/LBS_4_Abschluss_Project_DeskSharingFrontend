import {Component, OnInit} from '@angular/core';
import {QrCodegenComponent} from "../qr-codegen/qr-codegen.component";
import {QrCodeModule} from "ng-qrcode";

@Component({
  selector: 'app-qr-codes',
  standalone: true,
  imports: [
    QrCodegenComponent,
    QrCodeModule
  ],
  templateUrl: './qr-codes.component.html',
  styleUrl: './qr-codes.component.css'
})
export class QrCodesComponent implements OnInit{



  ngOnInit() {

  }

}
