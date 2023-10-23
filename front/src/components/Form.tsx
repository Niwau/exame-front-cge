import { useForm, DefaultValues, Path, FieldValues, RegisterOptions, UseFormReturn } from 'react-hook-form';
import { Field } from './Field';
import { Input } from './Input';
import { ZodSchema } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select } from './Select';
import { Children } from '@/types/Children';

export interface Option {
  value: string;
  label: string;
}

export interface FormField<T> extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: Path<T>;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  options?: Option[];
  registerOptions?: RegisterOptions;
}

interface FormProps<T extends FieldValues> extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  fields: FormField<T>[];
  schema: ZodSchema;
  defaultValues?: DefaultValues<T>;
  onSubmit?: (value: T, methods: UseFormReturn<T>) => void;
  title?: string;
}

export const Form = <T extends FieldValues>({
  children,
  fields,
  className,
  defaultValues,
  onSubmit,
  schema,
  title,
  ...rest
}: FormProps<T>) => {
  const methods = useForm<T>({ defaultValues, resolver: zodResolver(schema) });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = methods;

  const submit = (form: T) => {
    onSubmit?.(form, methods);
  };

  return (
    <form className={`mt-4 flex flex-col gap-6 ${className}`} onSubmit={handleSubmit(submit)} {...rest}>
      <FormTitle>{title}</FormTitle>
      {fields.map(({ registerOptions, options, ...field }, index) =>
        options ? (
          <Field key={index}>
            <Field.Label>{field.label}</Field.Label>
            <Select {...register(field.name, registerOptions)} errorMessage={errors[field.name]?.message as string}>
              {options.map((option, index) => (
                <option value={option.value} key={index}>
                  {option.label}
                </option>
              ))}
            </Select>
          </Field>
        ) : (
          <Field key={index}>
            <Field.Label>{field.label}</Field.Label>
            <Input
              {...field}
              {...register(field.name, registerOptions)}
              errorMessage={errors[field.name]?.message as string}
            />
          </Field>
        )
      )}
      {children}
    </form>
  );
};

const FormTitle = ({ children }: Children) => {
  return (
    <h1 className="text-lg font-semibold text-white">{children}</h1>
  )
};
