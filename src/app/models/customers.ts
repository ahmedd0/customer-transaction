import { Transactions } from './transactions';

export interface Customers {
  id: number;
  name: string;
  transactions?: Transactions[];
  totalTransaction?: number;
}
