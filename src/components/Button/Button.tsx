type ButtonProps = {
  theme?: 'primary' | 'secondary';
  type?: 'button' | 'submit';
  text?: string;
};

const Button = ({ type, text, theme }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${
        theme === 'primary' ? 'bg-blue text-white' : theme === 'secondary' ? 'bg-white' : ''
      } block w-full h-[40px] border border-grey60 rounded-lg focus:outline-0 focus:shadow-input px-2`}
    >
      {text}
    </button>
  );
};

export default Button;
