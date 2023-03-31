import styles from './Swithcer.module.scss';

type TSwitcherProps = {
  label?: string;
  name?: string;
  id?: string;
  options?: string[];
  defaultOption?: string | number;
  value?: string | number;
  onChange?: (e: React.FormEvent) => void;
};

const Switcher = ({ label, name, options, defaultOption, onChange }: TSwitcherProps) => {
  return (
    <div className="mb-7">
      <label className="block font-medium text-base color-grey mb-2.5">{label}</label>
      <div className="flex align-middle rounded-lg bg-blue80 p-1">
        {options?.map((opt) => (
          <div key={`${name}-${opt}`} className="w-1/2 relative">
            <input
              type="radio"
              name={name}
              id={`${name}-${opt}`}
              value={opt}
              className={`w-0 h-0 absolute ${styles.input}`}
              defaultChecked={defaultOption === opt}
              onChange={onChange}
            />
            <label
              htmlFor={`${name}-${opt}`}
              className="rounded-md text-primColor h-[32px] flex items-center justify-center cursor-pointer"
            >
              {opt}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Switcher;
