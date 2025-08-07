import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import QRCodeStyling from 'qr-code-styling';

@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [],
  templateUrl: './qr-code.component.html',
  styleUrl: './qr-code.component.scss'
})
export class QrCodeComponent implements AfterViewInit {
  @Input() data!: string;
  @Input() width = 120;
  @Input() height = 120;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    const qrCode = new QRCodeStyling({
      width: this.width,
      height: this.height,
      data: this.data,
      dotsOptions: {
        color: '#000',
        type: 'square'
      },
      backgroundOptions: {
        color: '#ffffff',
      }
    });

    qrCode.append(this.elementRef.nativeElement.querySelector('div'));
  }

}
