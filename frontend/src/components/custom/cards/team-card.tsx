'use client';

import { Folder, Users2 } from 'lucide-react';
import { LightweightTitle } from '../typography';
import BaseCard from './base-card';
import RouteLink from '../route-link';
import Avatar from '../avatar';
import { cn } from '@/lib/utils';
import Tip from '../tip';

export type TeamCardProps = {
  id: string;
  name: string;
  owner?: boolean;
  members: {
    id: string;
    name: string;
  }[];
};

export default function TeamCard({ members, name, id }: TeamCardProps) {
  return (
    <RouteLink
      href={`/teams/${id}`}
      className="ultra:w-[calc(100%/8)] tablet:w-[calc(100%/2)] laptop:w-[calc(100%/3)]  desktop:w-[calc(100%/5)] w-full p-2"
    >
      <BaseCard hoverEffect>
        <div className="flex h-32 flex-col justify-end">
          <LightweightTitle className="flex items-center gap-2">
            <Users2 size={16} className="text-zinc-200" /> {name}
          </LightweightTitle>

          <div className="flex h-10 flex-row items-center">
            {members.slice(0, 4).map((member, index) => (
              <div
                key={member.id}
                className={cn('flex items-center transition-all hover:mr-2', {
                  '-ml-2': index > 0,
                  'hover:ml-0': index > 0,
                })}
              >
                <Tip text={member.name}>
                  <Avatar name={member.name} />
                </Tip>
              </div>
            ))}

            {members.length > 4 && (
              <div className="bg-zin -ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200 text-zinc-600">
                <span className="text-sm">+{members.length - 4}</span>
              </div>
            )}
          </div>
        </div>
      </BaseCard>
    </RouteLink>
  );
}
