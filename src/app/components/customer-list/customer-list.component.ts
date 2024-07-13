import { Component } from '@angular/core';
import { CustomersService } from './../../services/customers/customers.service';
import { TransactionsService } from '../../services/transactions/transactions.service';
import { CurrencyPipe } from '@angular/common';
import { TransactionDetailsComponent } from '../transaction-details/transaction-graph.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Customers } from '../../models/customers';
import { Transactions } from '../../models/transactions';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CurrencyPipe, TransactionDetailsComponent, MatDialogModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss',
})
export class CustomerListComponent {
  customers: Customers[] = [];
  transactions: Transactions[] = [];
  allCustomers: Customers[] = [];
  filteredCustomers: Customers[] = [];

  constructor(
    private _CustomersService: CustomersService,
    private _TransactionsService: TransactionsService,
    private _MatDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getTransactions();
    this.getAllCustomers();
  }
  getAllCustomers() {
    this._CustomersService.getAllCustomers().subscribe({
      next: (res) => {
        this.customers = res;

        this.allCustomers = this.customers.map((customer) => {
          let transactions = this.filterTransactions(customer.id);
          let totalTransaction = this.calcTotalTransaction(transactions);

          return {
            ...customer,
            transactions: transactions,
            totalTransaction: totalTransaction,
          };
        });

        this.filteredCustomers = this.allCustomers;
      },
    });
  }
  calcTotalTransaction(transactions: Transactions[]) {
    return transactions?.reduce((total: number, transaction: any) => {
      return total + transaction.amount;
    }, 0);
  }
  getTransactions() {
    this._TransactionsService
      .getAllTransaction()
      .subscribe((res: Transactions[]) => {
        this.transactions = res;
      });
  }
  filterTransactions(customerId: number): any {
    return this.transactions.filter((transaction) => {
      return transaction.customer_id == customerId;
    });
  }
  filterCustomersByName(value: string, amount: number) {
    const valueLower = value.toLowerCase();

    this.filteredCustomers = this.allCustomers.filter((customer: Customers) => {
      const matchesName = customer.name.toLowerCase().includes(valueLower);
      console.log(matchesName);
      const matchesAmount = !amount || amount == customer.totalTransaction;
      console.log(matchesAmount);
      return matchesName && matchesAmount;
    });
  }

  filterCustomersByAmount(amount: number, search: string) {
    const searchLower = search.toLowerCase();

    this.filteredCustomers = this.allCustomers.filter((customer: any) => {
      const matchesAmount = !amount || customer.totalTransaction == amount;
      const matchesSearch =
        !search || customer.name.toLowerCase().includes(searchLower);

      return matchesAmount && matchesSearch;
    });
  }
  openTransactionDetails(customerId: number) {
    this._MatDialog.open(TransactionDetailsComponent, {
      data: this.filterTransactions(customerId),
      maxHeight: '90vh',
      width: '80%',
    });
  }
}
