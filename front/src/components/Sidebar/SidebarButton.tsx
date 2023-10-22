import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

interface SidebarButtonProps extends LinkProps {
  children: React.ReactNode;
}

export const SidebarButton = ({ children, ...rest }: SidebarButtonProps) => {
  const router = useRouter();

  const background = router.pathname === rest.href ? 'bg-dark-300' : '';

  return (
    <SidebarButtonContainer className={background}>
      <Link className='flex items-center justify-center' {...rest}>{children}</Link>
    </SidebarButtonContainer>
  );
};

export const SidebarButtonContainer = ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`w-full rounded-lg hover:bg-dark-300 flex items-center cursor-pointer transition-all justify-center p-2 ${className}`}
    >
      {children}
    </div>
  );
};
