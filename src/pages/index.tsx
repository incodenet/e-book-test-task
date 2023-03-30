import styles from '../styles/Home.module.scss';
import type { NextPage } from 'next';
import Head from 'next/head';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import Switcher from '../components/Switcher/Switcher';
import Image from 'next/image';
import Jdenticon from 'react-jdenticon';
import { useCallback, useState } from 'react';

interface FormState {
  firstName?: string;
  lastName?: string;
  company?: string;
  status?: string;
  email?: string;
  password?: string;
}

const Home: NextPage = () => {
  const [form, setForm] = useState<FormState>({
    firstName: '',
    lastName: '',
    company: '',
    status: 'User',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(form);
  };

  const handleChange = useCallback((e: React.FormEvent) => {
    setForm((prev) => ({
      ...prev,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value,
    }));
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="flex h-full">
        <div className="xl:w-[512px] lg:w-[400px] md:w-[350px] p-primary border-r-2 border-grey60 h-full">
          <h2 className="font-bold text-xl mb-9">Add Customer</h2>
          <form onSubmit={handleSubmit}>
            <div className="xl:flex gap-6">
              <Input
                type="text"
                label="First Name"
                name="firstName"
                value={form.firstName}
                onChange={(e) => handleChange(e)}
              />
              <Input
                type="text"
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <Input
              type="text"
              label="Company"
              name="company"
              value={form.company}
              onChange={(e) => handleChange(e)}
            />
            <Switcher
              label="Status"
              name="status"
              options={['User', 'Administrator']}
              defaultOption={form.status}
              onChange={(e) => handleChange(e)}
            />
            <Input
              type="email"
              label="Email"
              name="email"
              value={form.email}
              onChange={(e) => handleChange(e)}
            />
            <Input
              type="password"
              name="password"
              value={form.password}
              label="Password"
              hint="8+ characters"
              onChange={(e) => handleChange(e)}
            />
            <Button type="submit" text="Save" theme="primary" />
          </form>
        </div>
        <div className="flex-1 p-primary">
          <h2 className="font-bold text-xl mb-9">Customers</h2>
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
              <tr>
                <td>
                  <div className="flex gap-2 itmes-center">
                    <div className="w-[32px] h-[32px] p-1 bg-blue60 rounded-lg">
                      <Jdenticon size="24" value="email@gmail.com" />
                    </div>
                    <div className="font-medium text-primColor">Jane Cooper</div>
                  </div>
                </td>
                <td>Apple</td>
                <td>jessica.hanson@example.com</td>
                <td>
                  <div className="w-[49px] h-[24px] bg-grey60 rounded relative top-[-2px]"></div>
                </td>
                <td>
                  <div className="flex gap-4">
                    <div>
                      <Image src="/icon-edit.svg" alt="Edit" width={24} height={24} />
                    </div>
                    <div>
                      <Image src="/icon-trash.svg" alt="Edit" width={24} height={24} />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
