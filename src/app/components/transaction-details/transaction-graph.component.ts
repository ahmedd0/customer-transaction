import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-transaction-graph',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.scss',
})
export class TransactionDetailsComponent {
  isBrowser: any;
  lineChartLegend = true;
  lineChartData: ChartConfiguration<'line'>['data'];
  lineChartOptions: ChartOptions<'line'>;
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(MAT_DIALOG_DATA) public transactions: any
  ) {
    this.lineChartOptions = {
      responsive: true,
    };
    this.lineChartData = {
      labels: this.transactions.map((transaction: any) => transaction.date),
      datasets: [
        {
          data: this.transactions.map((transaction: any) => transaction.amount),
          label: 'Transactions',
          fill: true,
          tension: 0.5,
          borderColor: 'black',
          backgroundColor: 'rgba(255,0,0,0.3)',
        },
      ],
    };
  }
  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
}
