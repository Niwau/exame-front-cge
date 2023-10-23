import { Trash, FloppyDisk, Plus, Pen } from '@phosphor-icons/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: React.ReactNode;
}

export const Button = ({ children, className, leftIcon, ...rest }: ButtonProps) => {
  return (
    <button className={`btn-primary ${className}`} {...rest}>
      {leftIcon}
      {children}
    </button>
  );
};

export const DeleteButton: typeof Button = ({ ...rest }) => {
  return <Button className="btn-danger" leftIcon={<Trash weight="bold" />} {...rest} />;
};

export const SaveButton: typeof Button = ({ ...rest }) => {
  return <Button leftIcon={<FloppyDisk weight="bold" />} {...rest} />;
};

export const AddButton: typeof Button = ({ ...rest }) => {
  return <Button leftIcon={<Plus weight="bold" />} {...rest} />;
};

export const EditButton: typeof Button = ({ ...rest }) => {
  return <Button leftIcon={<Pen weight="duotone" size={24} />} className='btn-transparent p-0' {...rest} />;
};
