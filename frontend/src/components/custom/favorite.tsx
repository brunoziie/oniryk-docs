import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

export type FavoriteProps = React.HTMLAttributes<HTMLButtonElement> & {
  favorite?: boolean;
  onToggle?: (favorited: boolean) => void | Promise<void>;
};

export default function Favorite({
  favorite = false,
  onToggle,
  className,
  ...props
}: FavoriteProps) {
  const [animating, setAnimating] = useState(false);
  const [interacted, setInteracted] = useState(false);

  const handleToggleFavorite = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation();
      e.preventDefault();
      setInteracted(true);
      onToggle && onToggle(!favorite);
    },
    [onToggle, favorite]
  );

  useEffect(() => {
    if (favorite && interacted) {
      setAnimating(true);

      const timeout = setTimeout(() => {
        setAnimating(false);
      }, 550);

      return () => clearTimeout(timeout);
    }
  }, [interacted, favorite]);

  return (
    <button
      {...props}
      className={cn('h-8 w-8 cursor-pointer')}
      onClick={handleToggleFavorite}
    >
      <Heart
        size={16}
        fill={favorite ? '#000' : 'none'}
        className={cn({
          'text-zinc-200 dark:text-zinc-600': !favorite,
          'text-zinc-800 dark:text-white': favorite,
          'animate-happy': animating,
        })}
      />
    </button>
  );
}
