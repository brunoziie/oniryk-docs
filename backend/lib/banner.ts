import { bold, green, style } from './core/colors';

export default function banner() {
  return style(
    ` 

   █▀▀█ █▀▀▄  ▀  █▀▀█ █  █ █ █
   █  █ █  █ ▀█▀ █▄▄▀ █▄▄█ █▀▄
   ▀▀▀▀ ▀  ▀ ▀▀▀ ▀ ▀▀ ▄▄▄█ ▀ ▀
 
  `,
    bold,
    green
  );
}
