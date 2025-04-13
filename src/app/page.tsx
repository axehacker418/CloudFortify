import {Dashboard} from '@/components/dashboard/dashboard';
import {SidebarProvider} from '@/components/ui/sidebar';
import {Toaster} from '@/components/ui/toaster';

export default function Home() {
  return (
    <SidebarProvider>
      <Dashboard />
      <Toaster />
    </SidebarProvider>
  );
}
