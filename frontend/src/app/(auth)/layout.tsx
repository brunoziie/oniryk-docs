import { Card, CardContent } from '@/components/ui/card';
import ParticleBackground from '@/components/ui/particle-background';

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <main>
      <ParticleBackground />

      <div className="flex items-center justify-center h-screen w-screen absolute">
        <Card>
          <CardContent>
            <div className="py-8 px-8 pt-10 w-[360px]">{children}</div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
