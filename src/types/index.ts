import { ICustomer } from '../interfaces';

export type TCustomerContextType = {
  customers: ICustomer[];
  addCustomer: (customer: ICustomer) => void;
  updateCustomer: (id: string, customer: ICustomer) => void;
  deleteCustomer: (id: string) => void;
};
