const BASE = '/openpeeps';
const LOADED: Record<string, HTMLImageElement | SVGElement> = {};

export function loadAsset(
  path: string,
  skinColor: string = '#ffffff'
): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const cacheKey = `${path}-${skinColor}`;
    const save = (img: HTMLImageElement) => {
      LOADED[cacheKey] = img;
      resolve(img);
    };

    if (LOADED[cacheKey]) {
      resolve(LOADED[cacheKey] as HTMLImageElement);
      return;
    }

    if (skinColor !== '#ffffff') {
      loadWithSkinColor(path, skinColor).then(save).catch(reject);
      return;
    }

    const src = `${BASE}/${path}`;
    const img = new Image();

    img.onload = () => save(img);
    img.onerror = reject;
    img.src = src;
  });
}

export async function loadWithSkinColor(
  path: string,
  skinColor: string
): Promise<HTMLImageElement> {
  const key = `${path}-${skinColor}-base`;

  let svg;

  if (LOADED[key]) {
    svg = LOADED[key] as SVGElement;
  } else {
    const res = await fetch(`${BASE}/${path}`);
    const div = document.createElement('div');
    div.innerHTML = await res.text();

    svg = div.firstChild as SVGElement;
    LOADED[key] = svg;
  }

  const bg = svg.querySelector('#🎨-Background');

  if (bg) {
    bg.setAttribute('fill', skinColor);
  }

  const blob = new Blob([svg.outerHTML], { type: 'image/svg+xml' });

  return await new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      resolve(img);
    };

    img.onerror = reject;
    img.src = URL.createObjectURL(blob);
  });
}

export async function loadMany(ops: Promise<HTMLImageElement>[]) {
  return await Promise.all(ops);
}
