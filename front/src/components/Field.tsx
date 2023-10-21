export const Field = ({ children, className, ...rest }: React.HTMLAttributes<HTMLFieldSetElement>) => {
  return (
    <fieldset className={`flex flex-col gap-1 ${className}`} {...rest}>
      { children }
    </fieldset>
  )
}

const Label = ({ children, className, ...rest }: React.LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label className={`text-sm text-white ${className}`} {...rest}>
      { children }
    </label>
  )
}

Field.Label = Label