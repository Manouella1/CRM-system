export interface DummyData {
  id: number;
  name: string;
  nyhetsbrev: boolean;
  betalat: boolean;
}

export interface Customer {
  id: number;
  company_id: number;
  name: string;
  phone: string;
  address: string;
  email: string;
}

export type CustomerData = Customer[];
