import { ChangeEvent, useCallback } from 'react';

export type BackgroundPickerProps = {
  value: string;
  onChange?: (value: string) => void | Promise<void>;
};

export function BackgroundPicker({ value, onChange }: BackgroundPickerProps) {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <div>
      <span className="pb-2 text-xs uppercase">background</span>

      <div className="border-input flex h-9 w-12 items-center justify-center rounded-md border ">
        <input
          className="m-0 h-6 w-8 appearance-none rounded-md bg-transparent"
          type="color"
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
