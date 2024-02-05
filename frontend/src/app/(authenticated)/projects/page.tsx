'use client';

import { DataTableFacetedFilter } from '@/components/filter-select/filter-select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Folder, PlusCircle, Search } from 'lucide-react';

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
      <div className="flex flex-row place-content-between items-center">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <Button variant="outline">
          <PlusCircle size={16} className="mr-2" />
          New project
        </Button>
      </div>

      <div className="mt-6 mb-4 border-b border-zinc-100 dark:border-zinc-700"></div>

      <div className="mb-4 flex flex-row items-center gap-4">
        <form>
          <div className="relative">
            <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground " />
            <Input
              placeholder="Search"
              className="pl-8 h-8  dark:border dark:border-zinc-600"
            />
          </div>
        </form>

        <DataTableFacetedFilter title="Status" options={options} />
      </div>

      <div className="flex flex-wrap -m-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="w-full md:w-1/2 lg:w-1/4 xl:w-1/6  p-2">
            <div className="rounded-lg p-4 shadow-sm border border-zinc-100 dark:border-zinc-700 h-36 flex flex-col">
              <div className="flex-1 flex flex-row justify-end">
                <span className="text-5xl">
                  <Folder size={25} className="text-zinc-200" />
                </span>
              </div>
              <div>
                <h2 className="text-lg font-medoium truncate">
                  {randomProjectNames[index]}
                </h2>
                <p className="text-zinc-400 text-xs truncate">
                  A platform for managing recipes and ingredients.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
