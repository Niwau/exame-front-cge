import React, { forwardRef } from 'react';
import { ErrorMessage } from './ErrorMessage';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  errorMessage?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ errorMessage, children, ...rest }, ref) => {
  const invalid = errorMessage && 'outline-1 outline-danger outline';

  return (
    <div className="w-full flex flex-col gap-1">
      <select
        ref={ref}
        className={`bg-dark-400 outline-2 text-white border-0 rounded-full py-2 px-4 focus:outline focus:outline-primary ${invalid}`}
        {...rest}
      >
        {children}
      </select>
      <ErrorMessage message={errorMessage} />
    </div>
  );
});

Select.displayName = 'Select';
