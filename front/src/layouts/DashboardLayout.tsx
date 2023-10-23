import { Sidebar } from '@/components/Sidebar/Sidebar';
import { Children } from '@/types/Children';
import { PrivateLayout } from './PrivateLayout';

export default function DashboardLayout({ children }: Children) {
  return (
    <PrivateLayout>
      <div className="grid grid-cols-[64px_calc(100%-64px)]">
        <Sidebar />
        <div className="p-8 flex flex-1">{children}</div>
      </div>
    </PrivateLayout>
  );
}
