import { Folder } from 'lucide-react';
import { useCallback, useState } from 'react';
import Favorite from '../favorite';
import RouteLink from '../route-link';
import { LightweightTitle, TextSecondary } from '../typography';
import BaseCard from './base-card';

export type ProjectCardPops = {
  id: string;
  name: string;
  description: string;
  favorite?: boolean;
  onToggleFavorite?: (favorite: Boolean) => void | Promise<void>;
};

export default function ProjectCard(props: ProjectCardPops) {
  const { id, name, description, favorite, onToggleFavorite } = props;
  const [isFavorite, setIsFavorite] = useState(favorite);

  const handleToggleFavorite = useCallback(
    (state: boolean) => {
      setIsFavorite(state);
    },
    [favorite]
  );

  return (
    <RouteLink
      href={`/projects/${id}`}
      className="ultra:w-[calc(100%/8)] tablet:w-[calc(100%/2)] laptop:w-[calc(100%/3)]  desktop:w-[calc(100%/5)] w-full p-2"
    >
      <BaseCard hoverEffect>
        <div className="relative flex h-24 flex-1 flex-row justify-end">
          <div className="absolute -right-4 -top-2">
            <Favorite onToggle={handleToggleFavorite} favorite={isFavorite} />
          </div>
        </div>
        <div className="flex flex-col">
          <LightweightTitle className="flex items-center gap-2">
            <Folder size={16} className="text-zinc-200" /> {name}
          </LightweightTitle>
          <TextSecondary className="truncate">{description}</TextSecondary>
        </div>
      </BaseCard>
    </RouteLink>
  );
}
