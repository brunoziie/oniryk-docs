import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export type PropertySelectorProps<T extends unknown> = {
  label: string;
  options: T[];
  selected: T;
  onChange?: (value: T) => void | Promise<void>;
};

const makeLabel = (label: string) => {
  return label
    .replace(/_/g, ' ')
    .replace(/[^a-z0-9\s]/g, '')
    .split(' ')
    .map(ucfirst)
    .join(' ');
};

const ucfirst = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default function PropertySelector<T>({
  label,
  options,
  selected,
  onChange,
}: PropertySelectorProps<T>) {
  const next = () => {
    const index = options.indexOf(selected);
    const next = options[(index + 1) % options.length];
    onChange && onChange(next);
  };

  const prev = () => {
    const index = options.indexOf(selected);
    const prev = options[(index - 1 + options.length) % options.length];
    onChange && onChange(prev);
  };

  return (
    <div>
      <span className=" pb-2 text-xs uppercase">{label}</span>
      <div className="flex flex-row gap-2">
        <Button variant="outline" size="icon" onClick={prev}>
          <ArrowLeft size={16} />
        </Button>

        <Select
          value={selected as string}
          onValueChange={(v) => onChange && onChange(v as T)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {options.map((option) => (
                <SelectItem value={option as string}>
                  {makeLabel(option as string)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button variant="outline" size="icon" onClick={next}>
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
}
