import { createContext, useEffect, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ICustomer } from '../interfaces';
import { TCustomerContextType } from '../types';

export const CustomerContext = createContext<TCustomerContextType | null>(null);

const CustomerContextProvider: React.PropsWithChildren<any> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [customers, setCustomers] = useState<Array<ICustomer>>([]);

  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(customers));

    console.log('state intialized ');
  }, [customers]);

  useEffect(() => {
    const customerFromStorage = localStorage.getItem('customers');

    console.log('state updated | intialized');

    setCustomers(JSON.parse(customerFromStorage!));
  }, []);

  const addCustomer = (data: ICustomer) => {
    setCustomers((prev) => [...prev, { id: uuidv4(), ...data }]);
  };

  const updateCustomer = (id: string, updatedEmployeeData: ICustomer) => {
    setCustomers(
      customers.map((employee) => (employee.id === id ? updatedEmployeeData : employee)),
    );
  };

  const deleteCustomer = (id: string) => {
    setCustomers(customers.filter((employee) => employee.id !== id));
  };

  return (
    <CustomerContext.Provider value={{ customers, addCustomer, updateCustomer, deleteCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerContextProvider;
