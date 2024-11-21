
export interface Customer {
  id: number;
  company_id: number;
  name: string;
  phone: string;
  address: string;
  email: string;
}

export type CustomerData = Customer[];

export interface Company {
  id: number;
  name: string;
  email: string;
  password: string;
}

export type CompanyData = Company[];

