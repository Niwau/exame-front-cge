import { forwardRef } from 'react';
import { ErrorMessage } from './ErrorMessage';
import { MagnifyingGlass } from '@phosphor-icons/react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  containerStyle?: React.HTMLAttributes<HTMLDivElement>['className'];
  LeftIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, errorMessage, containerStyle, LeftIcon, ...rest }, ref) => {
    const invalid = errorMessage && 'outline-1 outline-danger outline';

    return (
      <div className={`flex flex-col gap-1 relative ${containerStyle}`}>
        <div className="absolute top-[50%] translate-y-[-50%] left-3">{LeftIcon}</div>
        <input
          ref={ref}
          type="text"
          className={`bg-dark-400 outline-2 text-white border-0 rounded-full py-2 pr-4 ${
            LeftIcon ? 'pl-9' : 'pl-4'
          } focus:outline focus:outline-primary ${invalid} ${className}`}
          {...rest}
        />
        <ErrorMessage message={errorMessage} />
      </div>
    );
  }
);

export const Search: typeof Input = forwardRef((props, ref) => {
  return (
    <Input
      ref={ref}
      LeftIcon={<MagnifyingGlass color="white" size={20} weight="duotone" />}
      onChange={props.onChange}
      containerStyle="basis-[40%]"
      placeholder="Pesquisar..."
      {...props}
    />
  );
});

Search.displayName = 'Search';

Input.displayName = 'Input';
