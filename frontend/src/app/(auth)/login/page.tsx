import IconGitHub from '@/components/icons/github';
import IconGoogle from '@/components/icons/google';
import IconLogo from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Page() {
  return (
    <>
      <div className="flex justify-center mb-4">
        <IconLogo className="w-16 h-16" animate />
      </div>

      <h2 className="text-center font-medium">Oniryk Docs</h2>

      <p className="text-center text-sm text-gray-400">Log into your account</p>

      <div className="mb-6"></div>
      <div className="mb-4">
        <Input placeholder="email" className="mb-2" />
        <Input placeholder="password" />
      </div>
      <div>
        <Button className="w-full">Login</Button>

        <div className="p-2 text-center">
          <a
            className="text-blue-500 hover:text-blue-800 text-sm"
            href="/forgot-password"
          >
            Forgot Password?
          </a>
        </div>
      </div>

      <div className="mt-4">
        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button className="w-full" variant="outline">
            <IconGitHub className="w-4 h-4 mr-2" />
            Continue with GitHub
          </Button>

          <Button className="w-full" variant="outline">
            <IconGoogle className="text-red-500 w-4	h-4 mr-2" />
            Continue with Google
          </Button>
        </div>
      </div>
    </>
  );
}
