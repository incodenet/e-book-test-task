import { createContext, useEffect, useState, ReactNode, useCallback } from 'react';
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
  }, [customers]);

  useEffect(() => {
    const customerFromStorage = localStorage.getItem('customers');

    setCustomers(JSON.parse(customerFromStorage!));
  }, []);

  const addCustomer = (data: ICustomer) => {
    setCustomers((prev) => [...prev, { id: uuidv4(), ...data }]);
  };

  const updateCustomer = useCallback(
    (id: string, updatedEmployeeData: ICustomer) => {
      setCustomers(customers.map((c) => (c.id === id ? updatedEmployeeData : c)));
    },
    [customers],
  );

  const deleteCustomer = useCallback(
    (id: string) => {
      setCustomers(customers.filter((c) => c.id !== id));
    },
    [customers],
  );

  return (
    <CustomerContext.Provider value={{ customers, addCustomer, updateCustomer, deleteCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerContextProvider;
