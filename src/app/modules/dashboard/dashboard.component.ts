import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import { Chart, registerables } from 'chart.js';
import { finalize, map, Observable, startWith } from 'rxjs';
import { SalesService } from '../../services/sales.service';
import { Sale } from '../../types/sales.interface';
Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements AfterViewInit, OnInit {
  sales: Sale[] = [];
  totalRevenue: number = 0;

  isLoading$!: Observable<boolean>;

  @ViewChild('doughnutCanvas', { static: true })
  doughnutCanvas!: ElementRef<HTMLCanvasElement>;
  doughnutChart!: Chart;

  data = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
        ],
        hoverOffset: 4,
      },
    ],
  };

  constructor(private salesService: SalesService) {}

  ngOnInit() {
    this.isLoading$ = this.salesService.getSales().pipe(
      map((data) => {
        this.sales = data;

        const categories = Array.from(new Set(data.map((s) => s.category)));
        const categoryTotals = categories.map((cat) =>
          data
            .filter((s) => s.category === cat)
            .reduce((sum, s) => sum + s.price * s.quantity, 0)
        );

        // 🔹 Cria os degradês AQUI
        const ctx = this.doughnutCanvas.nativeElement.getContext('2d')!;

        const gradientBlue = ctx.createLinearGradient(0, 0, 0, 400);
        gradientBlue.addColorStop(0, '#36D1DC');
        gradientBlue.addColorStop(1, '#5B86E5');

        const gradientPink = ctx.createLinearGradient(0, 0, 0, 400);
        gradientPink.addColorStop(0, '#FF6A88');
        gradientPink.addColorStop(1, '#FF99AC');

        const gradientOrange = ctx.createLinearGradient(0, 0, 0, 400);
        gradientOrange.addColorStop(0, '#F7971E');
        gradientOrange.addColorStop(1, '#FFD200');

        const gradientGreen = ctx.createLinearGradient(0, 0, 0, 400);
        gradientGreen.addColorStop(0, '#56ab2f');
        gradientGreen.addColorStop(1, '#a8e063');

        // 🔹 Instancia o gráfico já usando os gradientes
        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
          type: 'doughnut',
          data: {
            labels: categories,
            datasets: [
              {
                label: 'Faturamento por Categoria',
                data: categoryTotals,
                backgroundColor: [
                  gradientBlue,
                  gradientPink,
                  gradientOrange,
                  gradientGreen,
                ],
                borderWidth: 2,
                borderColor: '#fff',
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'bottom' },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => `R$ ${tooltipItem.raw}`,
                },
              },
            },
          },
        });

        return false;
      }),

      startWith(true),
      finalize(() => console.log('Finalizado carregamento de vendas'))
    );

    // Receita total
    this.salesService.getTotalRevenue().subscribe((total) => {
      this.totalRevenue = total;
    });
  }

  ngAfterViewInit() {}
}
