import AppLayout from '@/components/application-layout/app-layout';

export default function AuthenticatedLayout({ children }: React.PropsWithChildren) {
  return <AppLayout>{children}</AppLayout>;
}
