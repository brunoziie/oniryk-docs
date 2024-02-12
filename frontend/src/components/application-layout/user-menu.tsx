import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import Avatar from '@/components/custom/avatar';
import { Button } from '../ui/button';
import { LogOut, Settings } from 'lucide-react';
import { TextSecondary } from '../custom/typography';
import RouteLink from '../custom/route-link';

export type UserMenuProps = {};

export default function UserMenu(props: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="relative h-8 w-8 rounded-full">
          <Avatar src="/avatar3.png" name="User" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <div className="flex flex-col items-center gap-2 p-4">
          <Avatar src="/avatar3.png" name="User" size="md" />
          <TextSecondary>@brunoziie</TextSecondary>
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <RouteLink href="/settings" className="flex items-center">
            <Settings size={16} className="mr-2" />
            Settings
          </RouteLink>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut size={16} className="mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
