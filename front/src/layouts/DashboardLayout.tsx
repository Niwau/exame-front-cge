import { Sidebar } from '@/components/Sidebar/Sidebar';
import { useAuthContext } from '@/contexts/AuthContex';
import Login from '@/pages';
import { Children } from '@/types/Children';

export default function DashboardLayout({ children }: Children) {

  const { isAuthenticated } = useAuthContext()

  if (!isAuthenticated) return (
    <Login/>
  )

  return (
    <div className='flex'>
      <Sidebar/>
      <div className='p-8 flex flex-1'>
        { children }
      </div>
    </div>
  );
}