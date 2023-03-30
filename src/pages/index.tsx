import styles from '../styles/Home.module.scss';
import type { NextPage } from 'next';
import Head from 'next/head';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import Switcher from '../components/Switcher/Switcher';
import Image from 'next/image';
import Jdenticon from 'react-jdenticon';
import { useCallback, useContext, useMemo, useState } from 'react';
import { ICustomer } from '../interfaces';
import { CustomerContext } from '../context/customer';
import { TCustomerContextType } from '../types';

const Home: NextPage = () => {
  const { customers, addCustomer, updateCustomer, deleteCustomer } = useContext(
    CustomerContext,
  ) as TCustomerContextType;

  const initialValues = {
    firstName: '',
    lastName: '',
    company: '',
    status: 'User',
    email: '',
    password: '',
  };

  const [form, setForm] = useState<Omit<ICustomer, 'id'>>(initialValues);
  const [currentCustomerId, setCurrentCustomerId] = useState<string>('');
  const [editMode, setEditMode] = useState<boolean>(false);
  const [disableSubmit, setDisableSubmit] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editMode) {
      updateCustomer(currentCustomerId, form);
    } else {
      addCustomer(form);
    }

    setForm(initialValues);
    setEditMode(false);
    setDisableSubmit(true);
  };

  const handleEdit = useCallback(
    (id: string) => {
      const item = customers.find((item) => item.id === id);

      console.log(id, customers);

      setEditMode(true);
      setCurrentCustomerId(id);
      setForm(item!);
    },
    [customers],
  );

  const handleDelete = useCallback((id: string) => {
    deleteCustomer(id);
  }, []);

  const handleChange = useCallback((e: React.FormEvent) => {
    setDisableSubmit(false);

    setForm((prev) => ({
      ...prev,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value,
    }));
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditMode(false);
    setForm(initialValues);
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="flex h-full">
        <div className="xl:w-[512px] lg:w-[400px] md:w-[350px] p-primary border-r-2 border-grey60 h-full">
          <h2 className="font-bold text-xl mb-9">{`${editMode ? 'Edit' : 'Add'}`} Customer</h2>
          <form onSubmit={handleSubmit}>
            <div className="xl:flex gap-6">
              <Input
                type="text"
                label="First Name"
                name="firstName"
                value={form?.firstName || ''}
                required
                onChange={(e) => handleChange(e)}
              />
              <Input
                type="text"
                label="Last Name"
                name="lastName"
                value={form?.lastName || ''}
                required
                onChange={(e) => handleChange(e)}
              />
            </div>
            <Input
              type="text"
              label="Company"
              name="company"
              value={form?.company || ''}
              onChange={(e) => handleChange(e)}
            />
            <Switcher
              label="Status"
              name="status"
              options={['User', 'Administrator']}
              defaultOption={form?.status || 'User'}
              onChange={(e) => handleChange(e)}
            />
            <Input
              type="email"
              label="Email"
              name="email"
              value={form?.email || ''}
              required
              onChange={(e) => handleChange(e)}
            />
            <Input
              type="password"
              name="password"
              value={form?.password || ''}
              label="Password"
              required
              hint="8+ characters"
              onChange={(e) => handleChange(e)}
            />
            <div className="xl:flex gap-6">
              <div className="flex-1">
                <Button
                  type="submit"
                  text={editMode ? 'Apply' : 'Save'}
                  theme="primary"
                  disabled={disableSubmit}
                />
              </div>
              {editMode && (
                <div className="w-1/2" onClick={() => handleCancelEdit()}>
                  <Button type="button" text="Cancel" theme="secondary" />
                </div>
              )}
            </div>
          </form>
        </div>
        <div className="flex-1 p-primary">
          <h2 className="font-bold text-xl mb-9">Customers</h2>
          {customers.length === 0 ? (
            <div>Nothing found...</div>
          ) : (
            <table className={`w-full ${styles.table}`}>
              <thead className="text-left text-grey80">
                <tr>
                  <td width="21%">Name</td>
                  <td width="17%">Company</td>
                  <td width="21%">Email</td>
                  <td width="5%">Admin</td>
                  <td width="4%">Actions</td>
                </tr>
              </thead>
              <tbody>
                {customers.map((item: ICustomer) => (
                  <tr key={item.id}>
                    <td>
                      <div className="flex gap-2 items-center">
                        <div className="w-[32px] h-[32px] p-1 bg-blue60 rounded-lg">
                          <Jdenticon size="24" value={item.email || item.firstName} />
                        </div>
                        <div className="font-medium text-primColor">
                          {item.firstName} {item.lastName}
                        </div>
                      </div>
                    </td>
                    <td>{item.company}</td>
                    <td>{item.email}</td>
                    <td>
                      <div
                        className={`w-[49px] h-[24px] rounded relative top-[-2px] ${
                          item.status === 'User' ? 'bg-grey60' : 'bg-blue'
                        }`}
                      ></div>
                    </td>
                    <td>
                      <div className="flex gap-4">
                        <button className="cursor-pointer" onClick={() => handleEdit(item.id!)}>
                          <Image src="/icon-edit.svg" alt="Edit" width={24} height={24} />
                        </button>
                        <button
                          className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={editMode}
                          onClick={() => handleDelete(item.id!)}
                        >
                          <Image src="/icon-trash.svg" alt="Delete" width={24} height={24} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
