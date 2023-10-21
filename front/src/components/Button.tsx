export const Button = ({ children, className, ...rest}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={`bg-primary hover:bg-primary-100 py-2 rounded-full px-4 text-white font-normal ${className}`} {...rest}>
      { children }
    </button>
  )
}