import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Sale } from '../types/sales.interface';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private sales: Sale[] = [
    {
      id: 1,
      product: 'Notebook',
      category: 'Eletrônicos',
      quantity: 3,
      price: 3500,
      date: '2025-09-01',
    },
    {
      id: 2,
      product: 'Smartphone',
      category: 'Eletrônicos',
      quantity: 5,
      price: 2000,
      date: '2025-09-03',
    },
    {
      id: 3,
      product: 'Cadeira Gamer',
      category: 'Móveis',
      quantity: 2,
      price: 1200,
      date: '2025-09-05',
    },
    {
      id: 4,
      product: 'Teclado Mecânico',
      category: 'Acessórios',
      quantity: 4,
      price: 400,
      date: '2025-09-08',
    },
    {
      id: 5,
      product: 'Monitor 27"',
      category: 'Eletrônicos',
      quantity: 2,
      price: 1500,
      date: '2025-09-12',
    },
    {
      id: 6,
      product: 'Mesa Escritório',
      category: 'Móveis',
      quantity: 1,
      price: 800,
      date: '2025-09-20',
    },
    {
      id: 7,
      product: 'Headset',
      category: 'Acessórios',
      quantity: 3,
      price: 600,
      date: '2025-09-25',
    },
  ];

  constructor() {}

  getSales(): Observable<Sale[]> {
    return of(this.sales).pipe(delay(1500));
  }

  getSalesByCategory(category: string): Observable<Sale[]> {
    return of(this.sales.filter((sale) => sale.category === category));
  }

  getTotalRevenue(): Observable<number> {
    const total = this.sales.reduce(
      (acc, sale) => acc + sale.price * sale.quantity,
      0
    );
    return of(total);
  }
}
