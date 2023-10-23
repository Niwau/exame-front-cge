import { useAuthContext } from '@/contexts/AuthContex';
import { SidebarButton, SidebarButtonContainer } from './SidebarButton';
import { Basket, Cube, SignOut } from '@phosphor-icons/react';

export const Sidebar = () => {

  const { setIsAuthenticated  } = useAuthContext()

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('token')
  }

  return (
    <aside className="bg-dark-100 h-full flex flex-col gap-2 py-4 px-2">
      <SidebarButton href="/products">
        <Basket size={'90%'} color="white" />
      </SidebarButton>
      <SidebarButton href="/categories">
        <Cube size={'90%'} color="white" />
      </SidebarButton>
      <SidebarButtonContainer className='mt-auto'>
        <SignOut size={'90%'} color="white" onClick={logout} />
      </SidebarButtonContainer>
    </aside>
  );
};
