import { CommonModule, DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { finalize, map, Observable, startWith } from 'rxjs';
import { SalesService } from '../../services/sales.service';
import { Sale } from '../../types/sales.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  sales: Sale[] = [];
  totalRevenue: number = 0;

  isLoading$!: Observable<boolean>;

  @ViewChild('doughnutCanvas', { static: true })
  doughnutCanvas!: ElementRef<HTMLCanvasElement>;
  doughnutChart!: Chart;

  constructor(private salesService: SalesService) {}

  ngOnInit() {
    this.isLoading$ = this.salesService.getSales().pipe(
      map((data) => {
        this.sales = data;
        return false; // quando os dados chegam
      }),
      startWith(true), // antes da resposta
      finalize(() => console.log('Finalizado carregamento de vendas'))
    );

    this.salesService.getTotalRevenue().subscribe((total) => {
      this.totalRevenue = total;
    });
  }
}
