import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomersService } from './services/customers/customers.service';
import { CustomerListComponent } from './components/customer-list/customer-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CustomerListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'customer-transactions';
}
