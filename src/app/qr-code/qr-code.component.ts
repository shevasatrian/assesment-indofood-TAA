import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [],
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements AfterViewInit {
  @Input() data!: string;
  @Input() width = 120;
  @Input() height = 120;

  @ViewChild('qrCodeContainer', { static: true }) qrCodeContainer!: ElementRef;

  ngAfterViewInit(): void {
    // Pastikan kode ini hanya jalan di browser
    if (typeof window !== 'undefined') {
      // Lazy-load qr-code-styling agar tidak error saat SSR/build
      import('qr-code-styling').then((module) => {
        const QRCodeStyling = module.default;

        const qrCode = new QRCodeStyling({
          width: this.width,
          height: this.height,
          data: this.data,
          dotsOptions: {
            color: '#000',
            type: 'square',
          },
          backgroundOptions: {
            color: '#ffffff',
          },
        });

        qrCode.append(this.qrCodeContainer.nativeElement);
      });
    }
  }
}
