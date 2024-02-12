import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ColorSchemeValue = ClassValue[] | string;

export function cs({ light, dark }: { light: ColorSchemeValue; dark: ColorSchemeValue }) {
  const _light = Array.isArray(light) ? light : [light];
  const _dark = Array.isArray(dark) ? dark : [dark];

  const darkClasses = clsx(_dark)
    .split(' ')
    .map((c) => `dark:${c}`)
    .join(' ');

  return twMerge(clsx([..._light, darkClasses]));
}
