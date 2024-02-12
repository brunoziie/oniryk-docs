import { cn } from '@/lib/utils';
import { User } from 'lucide-react';
import Image from 'next/image';

export type AvatarProps = {
  name?: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg' | number;
};

const SIZE_MAP = {
  sm: 32,
  md: 48,
  lg: 96,
};

export default function Avatar({ size = 'sm', src, name }: AvatarProps) {
  const _size = typeof size === 'number' ? size : SIZE_MAP[size as keyof typeof SIZE_MAP];
  const _className = 'rounded-full overflow-hidden bg-gray-200 hover:bg-gray-300';

  if (src) {
    return (
      <Image
        className={_className}
        width={_size}
        height={_size}
        src={src}
        alt={name || ''}
      />
    );
  } else {
    return (
      <div
        style={{ width: _size, height: _size }}
        className={cn(_className, 'flex items-center justify-center text-sm')}
        title={name}
      >
        {name ? name.charAt(0).toUpperCase() : <User size={_size * 0.5} />}
      </div>
    );
  }
}
