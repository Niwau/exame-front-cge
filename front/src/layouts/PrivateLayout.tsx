import { useAuthContext } from '@/contexts/AuthContex';
import { Children } from '@/types/Children';
import Login from '@/pages';

export const PrivateLayout = ({ children }: Children) => {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) return <Login />;
  return children;
};
