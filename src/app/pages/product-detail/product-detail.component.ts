import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

const PRODUCTS = [
  { id: 1, nama: 'Indomie Kari', berat: 100, status: 'Oke' },
  { id: 2, nama: 'Indomie Soto', berat: 500, status: 'Reject' },
  { id: 3, nama: 'Indomie Goreng', berat: 600, status: 'Oke' },
  { id: 4, nama: 'Sarimi', berat: 400, status: 'Reject' },
  { id: 5, nama: 'Supermi', berat: 200, status: 'Oke' }
];

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  produk: any;

  constructor(route: ActivatedRoute) {
    const id = Number(route.snapshot.paramMap.get('id'));
    this.produk = PRODUCTS.find(p => p.id === id);
  }

}
