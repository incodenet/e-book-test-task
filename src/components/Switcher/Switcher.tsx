import { useState } from 'react';
import styles from './Swithcer.module.scss';

type SwitcherProps = {
  label?: string;
  name?: string;
  id?: string;
  options?: string[];
  defaultOption?: string | number;
  onChange?: (e: React.FormEvent) => void;
};

const Switcher = ({ label, name, options, defaultOption, onChange }: SwitcherProps) => {
  const [value, setValue] = useState(true);

  return (
    <div className="mb-7">
      <label className="block font-medium text-base color-grey mb-2.5">{label}</label>
      <div className="flex align-middle rounded-lg bg-blue80 p-1">
        <div className="w-1/2 relative">
          <input
            type="radio"
            name={name}
            id={`${name}-1`}
            value={options![0]}
            className={`w-0 h-0 absolute ${styles.input}`}
            defaultChecked={defaultOption === options![0]}
            onChange={onChange}
          />
          <label
            htmlFor={`${name}-1`}
            className="rounded-md text-primColor h-[32px] flex items-center justify-center cursor-pointer"
          >
            {options![0]}
          </label>
        </div>
        <div className="w-1/2 relative">
          <input
            type="radio"
            name={name}
            id={`${name}-2`}
            value={options![1]}
            className={`w-0 h-0 absolute ${styles.input}`}
            defaultChecked={defaultOption === options![1]}
            onChange={onChange}
          />
          <label
            htmlFor={`${name}-2`}
            className="rounded-md text-primColor h-[32px] flex items-center justify-center cursor-pointer"
          >
            {options![1]}
          </label>
        </div>
      </div>
    </div>
  );
};

export default Switcher;
