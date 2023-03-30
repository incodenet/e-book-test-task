type TButtonProps = {
  theme?: 'primary' | 'secondary';
  type?: 'button' | 'submit';
  text?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const Button = ({ type, text, theme, disabled }: TButtonProps) => {
  return (
    <button
      type={type}
      className={`${
        theme === 'primary' ? 'bg-blue text-white' : theme === 'secondary' ? 'bg-white' : ''
      } block w-full h-[40px] border border-grey60 rounded-lg focus:outline-0 focus:shadow-input px-2 disabled:opacity-50 disabled:cursor-not-allowed`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
