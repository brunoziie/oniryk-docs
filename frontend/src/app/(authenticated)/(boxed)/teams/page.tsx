import CardGroup from '@/components/custom/cards/card-group';
import TeamCard from '@/components/custom/cards/team-card';
import Header from '@/components/custom/header';
import { Button } from '@/components/ui/button';
import { team } from '@/lib/faker';
import { PlusCircle } from 'lucide-react';

export default function TeamsPage() {
  const teams = Array.from({ length: 12 }).map((_) => team());

  return (
    <div>
      <Header title="Teams">
        <Button variant="outline">
          <PlusCircle size={16} className="mr-2" />
          New team
        </Button>
      </Header>

      <CardGroup>
        {teams.map((t) => (
          <TeamCard
            key={t.id}
            name={t.name as string}
            members={t.members as { id: string; name: string }[]}
          />
        ))}
      </CardGroup>
    </div>
  );
}
