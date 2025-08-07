import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Chart, ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import emailjs from 'emailjs-com';
import { QrCodeComponent } from './qr-code/qr-code.component';

interface Karyawan {
  nama: string;
  target: number;
  output: number;
  pencapaian: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NgChartsModule,
    QrCodeComponent 
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  

}
