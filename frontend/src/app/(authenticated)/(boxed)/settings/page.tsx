import OpenPeepsDialog from '@/components/openpeeps/openpeeps';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import {
  AlertCircle,
  Bell,
  LucideIcon,
  Mails,
  ShieldCheck,
  ToyBrick,
  User,
  Users2,
} from 'lucide-react';
import Image from 'next/image';

type SettingMenuItemProps = {
  href: string;
  title: string;
  icon: LucideIcon;
  danger?: boolean;
};

const SettingMenuItem = ({ href, title, icon: Icon, danger }: SettingMenuItemProps) => {
  return (
    <li className="mb-4">
      <a
        href={href}
        className={cn(
          'flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-800',
          {
            'text-red-600 hover:text-red-800': danger,
          }
        )}
      >
        <Icon size={16} className="mr-2" />
        {title}
      </a>
    </li>
  );
};

export default function SettingsPage() {
  return (
    <div>
      <div className="flex gap-8">
        <OpenPeepsDialog>
          <Image
            src="/avatar3.png"
            width={64}
            height={64}
            alt="Avatar"
            className="rounded-full"
          />
        </OpenPeepsDialog>

        <div>
          <h1 className="text-2xl font-semibold">bruno ziiê</h1>
          <p className="text-gray-400">@brunoziie</p>
        </div>
      </div>

      <div className="mb-4 mt-6 border-b border-zinc-100 dark:border-zinc-700"></div>

      <div className="flex pt-6">
        <div className="w-[220px]">
          <ul>
            <SettingMenuItem href="/settings/profile" title="Profile" icon={User} />
            <SettingMenuItem
              href="/settings/security"
              title="Security"
              icon={ShieldCheck}
            />
            <SettingMenuItem
              href="/settings/notifications"
              title="Notifications"
              icon={Bell}
            />

            <SettingMenuItem
              href="/settings/organization"
              title="Integrations"
              icon={ToyBrick}
            />
            <SettingMenuItem href="/settings/teams" title="Teams" icon={Users2} />
            <SettingMenuItem href="/settings/teams" title="Invites" icon={Mails} />
            <SettingMenuItem
              href="/settings/teams"
              title="Danger zone"
              icon={AlertCircle}
              danger
            />
          </ul>
        </div>

        <div className="w-[100%] max-w-[500px]">
          <div className="mb-10">
            <h2 className="text-xl font-semibold">Profile</h2>
            <p className="text-gray-400">
              Your profile is your identity. Keep it up to date.
            </p>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <Input placeholder="Name" className="mb-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <Input placeholder="Username" className="mb-2" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <Input placeholder="Email" />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <Textarea placeholder="Bio" />
          </div>

          <div className="mt-6">
            <Button>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
