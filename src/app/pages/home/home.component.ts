import { AfterViewInit, Component, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { QrCodeComponent } from '../../qr-code/qr-code.component';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule, isPlatformBrowser  } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import emailjs from 'emailjs-com';
import { Chart } from 'chart.js';

interface Karyawan {
  nama: string;
  target: number;
  output: number;
  pencapaian: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NgChartsModule,
    QrCodeComponent 
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('barChartCanvas') barChartCanvas!: ElementRef<HTMLCanvasElement>;

  karyawanList: Karyawan[] = [
    { nama: 'Abdul', target: 1000000, output: 960000, pencapaian: 0 },
    { nama: 'Budi', target: 1000000, output: 420000, pencapaian: 0 },
    { nama: 'Beni', target: 1000000, output: 1100000, pencapaian: 0 },
    { nama: 'Rian', target: 1000000, output: 950000, pencapaian: 0 },
    { nama: 'Romi', target: 1000000, output: 1000500, pencapaian: 0 },
    { nama: 'Farhan', target: 1000000, output: 550000, pencapaian: 0 },
    { nama: 'Krisna', target: 1000000, output: 953000, pencapaian: 0 },
    { nama: 'Fajar', target: 1000000, output: 1053000, pencapaian: 0 },
    { nama: 'Heri', target: 1000000, output: 876300, pencapaian: 0 },
    { nama: 'Nopri', target: 1000000, output: 300000, pencapaian: 0 },
    { nama: 'Dermawan', target: 1000000, output: 989000, pencapaian: 0 }
  ].map(k => ({
    ...k,
    pencapaian: (k.output / k.target) * 100
  })).sort((a, b) => b.pencapaian - a.pencapaian);

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const labels = this.karyawanList.map(k => k.nama);
      const data = this.karyawanList.map(k => parseFloat(k.pencapaian.toFixed(2)));

      new Chart(this.barChartCanvas.nativeElement, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Pencapaian (%)',
            data,
            backgroundColor: '#42A5F5'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 120
            }
          },
          plugins: {
            legend: {
              position: 'top'
            }
          }
        }
      });
    }
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Hitung pencapaian seperti biasa
    this.karyawanList = this.karyawanList
      .map(k => ({
        ...k,
        pencapaian: (k.output / k.target) * 100
      }))
      .sort((a, b) => b.pencapaian - a.pencapaian);
  }

  kirimNotifikasi() {
  const emailMap: Record<string, string> = {
    'Budi': 'budioperator99@gmail.com',
    'Nopri': 'nopri@gmail.com'
  };

  const penerima = this.karyawanList.filter(k => k.pencapaian <= 50);

  if (penerima.length === 0) {
    alert('Tidak ada operator dengan pencapaian ≤ 50%');
    return;
  }

  penerima.forEach(k => {
    const emailTujuan = emailMap[k.nama];

    if (emailTujuan) {
      const templateParams = {
        to_name: k.nama,
        to_email: emailTujuan,
        message: `Halo ${k.nama}, pencapaian Anda saat ini adalah ${k.pencapaian.toFixed(2)}%. Mohon segera ditingkatkan.`,
      };

      emailjs.send(
        'service_i0lsc5n',
        'template_q218pnu',
        templateParams,
        'chOKt6wPlsM9AZOKv'
      ).then(
        () => console.log(`Email berhasil dikirim ke ${k.nama}`),
        (error) => console.error(`Gagal kirim email ke ${k.nama}`, error)
      );
    }
  });

  alert('Notifikasi telah dikirim ke operator pencapaian ≤ 50%');
}

}
