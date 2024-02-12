'use client';

import CardGroup from '@/components/custom/cards/card-group';
import ProjectCard from '@/components/custom/cards/project-card';
import Header from '@/components/custom/header';
import { DataTableFacetedFilter } from '@/components/filter-select/filter-select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Search } from 'lucide-react';

const randomEmojis = ['📦', '🍔', '🍟', '🌭', '🍿', '🧁', '🍩', '🍪', '🍫', '🍦'];
const randomProjectNames = [
  'Rocambole',
  'Pizzaria',
  'Burger King',
  'McDonalds',
  'KFC',
  'Cinemark',
  'Cacau Show',
  'Bobs',
  'Subway',
  'Habibs',
];

export default function Page() {
  const options = randomProjectNames.map((name, index) => ({
    label: name,
    value: name,
    icon: () => <span>{randomEmojis[index]}</span>,
  }));

  return (
    <>
      <Header title="Projects">
        <Button variant="outline">
          <PlusCircle size={16} className="mr-2" />
          New project
        </Button>
      </Header>

      <div className="mb-4 flex flex-row items-center gap-4">
        <form>
          <div className="relative">
            <Search className="text-muted-foreground absolute left-2 top-2 h-4 w-4 " />
            <Input
              placeholder="Search"
              className="h-8 pl-8  dark:border dark:border-zinc-600"
            />
          </div>
        </form>

        <DataTableFacetedFilter title="Status" options={options} />
      </div>

      <CardGroup>
        {Array.from({ length: 10 }).map((_, index) => (
          <ProjectCard
            key={index}
            id={index + ''}
            name={randomProjectNames[index]}
            description="lorem ipsum sit amet"
            favorite={Math.random() > 0.5}
          />
        ))}
      </CardGroup>
    </>
  );
}
