export const Box = ({ children, className, ...rest }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`bg-dark-300 rounded-2xl border-dark-400 border-[1px] ${className}`} {...rest}>
      {children}
    </div>
  );
};
