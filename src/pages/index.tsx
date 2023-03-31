import styles from '../styles/Home.module.scss';
import type { NextPage } from 'next';
import Head from 'next/head';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import Switcher from '../components/Switcher/Switcher';
import { FormEvent, useCallback, useContext, useMemo, useState } from 'react';
import { ICustomer } from '../interfaces';
import { CustomerContext } from '../context/customer';
import { TCustomerContextType } from '../types';
import CustomerRow from '../components/CustomerRow/CustomerRow';
import { statusOptions } from '../constants/form-options';
import { ActionTranslationsEnum } from '../enums/action-translations-enum';

const Home: NextPage = () => {
  const { customers, addCustomer, updateCustomer, deleteCustomer } = useContext(
    CustomerContext,
  ) as TCustomerContextType;

  const initialValues = useMemo(
    () => ({
      firstName: '',
      lastName: '',
      company: '',
      status: statusOptions[0],
      email: '',
      password: '',
    }),
    [],
  );

  const [form, setForm] = useState<Omit<ICustomer, 'id'>>(initialValues);
  const [currentCustomerId, setCurrentCustomerId] = useState<string>('');
  const [editMode, setEditMode] = useState<boolean>(false);
  const [disableSubmit, setDisableSubmit] = useState<boolean>(true);
  const [passwordLengthWarning, setPasswordLengthWarning] = useState<boolean>(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (editMode) {
        updateCustomer(currentCustomerId, form);
      } else {
        addCustomer(form);
      }

      setForm(initialValues);
      setEditMode(false);
      setDisableSubmit(true);
    },
    [form, editMode, currentCustomerId, initialValues, addCustomer, updateCustomer],
  );

  const handleEdit = useCallback(
    (id: string) => {
      const item = customers.find((item) => item.id === id);

      setEditMode(true);
      setCurrentCustomerId(id);

      setForm(item!);
    },
    [customers],
  );

  const handleDelete = useCallback(
    (id: string) => {
      deleteCustomer(id);
    },
    [deleteCustomer],
  );

  const validatePasswordField = useCallback((e: FormEvent, fieldName: string) => {
    if (
      (e.target as HTMLInputElement).name === fieldName &&
      (e.target as HTMLInputElement).value.length < 8
    ) {
      setPasswordLengthWarning(true);
    } else {
      setPasswordLengthWarning(false);
    }
  }, []);

  const handleChange = useCallback(
    (e: React.FormEvent) => {
      setDisableSubmit(false);

      validatePasswordField(e, 'password');

      setForm((prev) => ({
        ...prev,
        [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value,
      }));
    },
    [validatePasswordField],
  );

  const handleCancelEdit = useCallback(() => {
    setEditMode(false);
    setForm(initialValues);
  }, [initialValues]);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="flex h-full">
        <div className="xl:w-[512px] lg:w-[400px] md:w-[350px] p-primary border-r-2 border-grey60 h-full">
          <h2 className="font-bold text-xl mb-9">
            {`${editMode ? ActionTranslationsEnum.EDIT : ActionTranslationsEnum.ADD}`} Customer
          </h2>
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
              options={statusOptions}
              defaultOption={form?.status}
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
              hint={
                <div
                  className={`text-sm mt-2.5 ${
                    passwordLengthWarning ? 'text-danger' : 'text-grey80'
                  }`}
                >
                  8+ characters
                </div>
              }
              onChange={(e) => handleChange(e)}
            />
            <div className="xl:flex gap-6">
              <div className="flex-1">
                <Button
                  type="submit"
                  text={editMode ? ActionTranslationsEnum.APPLY : ActionTranslationsEnum.SAVE}
                  theme="primary"
                  disabled={disableSubmit || passwordLengthWarning}
                />
              </div>
              {editMode && (
                <div className="w-1/2" onClick={() => handleCancelEdit()}>
                  <Button type="button" text={ActionTranslationsEnum.CANCEL} theme="secondary" />
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
                  <CustomerRow
                    key={item.id}
                    entity={item}
                    disableDelete={editMode}
                    handleEdit={() => handleEdit(item.id!)}
                    handleDelete={() => handleDelete(item.id!)}
                  />
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
