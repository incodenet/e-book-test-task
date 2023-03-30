import Image from 'next/image';
import { ReactNode, useCallback, useState } from 'react';

type TInputProps = {
  type?: 'text' | 'email' | 'password' | string;
  label?: string;
  name?: string;
  value?: string;
  id?: string;
  suffix?: ReactNode;
  hint?: string;
  required?: boolean;
  onChange?: (e: React.FormEvent) => void;
  onSuffixClick?: () => void;
};

const Input = ({
  type,
  name,
  value,
  label,
  suffix,
  hint,
  required,
  onSuffixClick,
  onChange,
}: TInputProps) => {
  const eyeOn = '/icon-eye.svg';
  const eyeOff = '/icon-eye-off.svg';

  const [passwordVisibile, setPasswordVisibile] = useState<boolean>(false);

  const handleTogglePassword = useCallback(() => {
    setPasswordVisibile(!passwordVisibile);
  }, [passwordVisibile]);

  return (
    <div className="mb-6">
      <label className="block font-medium text-base color-grey mb-2.5">{label}</label>
      <div className="relative">
        <input
          type={type === 'password' ? (passwordVisibile ? 'text' : 'password') : type}
          name={name}
          value={value}
          required={required}
          className="block w-full h-[40px] border border-grey60 rounded-lg focus:outline-0 focus:shadow-input py-3 px-2 text-primColor"
          onChange={onChange}
        />

        <div className="flex align-middle gap-1 absolute right-[14px] bottom-[12px]">
          {suffix && (
            <div className={`flex ${onSuffixClick && 'cursor-pointer'}`} onClick={onSuffixClick}>
              {suffix}
            </div>
          )}

          {type === 'password' && (
            <div className="flex cursor-pointer" onClick={handleTogglePassword}>
              <Image src={passwordVisibile ? eyeOff : eyeOn} alt="Eye" width={20} height={16} />
            </div>
          )}
        </div>
      </div>
      {hint && <div className="text-sm text-grey80 mt-2.5">{hint}</div>}
    </div>
  );
};

export default Input;
