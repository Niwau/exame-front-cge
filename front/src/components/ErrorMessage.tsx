interface ErrorMessageProps {
  message?: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    message ? <p className="text-danger font-normal">{message}</p> : null
  )
};
