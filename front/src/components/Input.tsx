import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, errorMessage, ...rest }, ref) => {
  const invalid = errorMessage && 'outline-1 outline-danger outline';

  return (
    <div className="flex flex-col gap-1">
      <input
        ref={ref}
        type="text"
        className={`bg-dark-400 outline-2 text-white border-0 rounded-full py-2 px-4 focus:outline focus:outline-primary ${invalid} ${className}`}
        {...rest}
      />
      {invalid && <p className="text-danger font-normal">{errorMessage}</p>}
    </div>
  );
});

Input.displayName = 'Input';
