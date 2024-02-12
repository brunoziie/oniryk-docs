import {
  RATIO,
  FACE_SIZE,
  HEAD_SIZE,
  BODY_SIZE,
  ACCESSORY_SIZE,
  FACIAL_HAIR_SIZE,
  CANVAS,
  Body,
  Head,
  Accessory,
  FacialHair,
  Face,
} from './constants';

export const px = (n: number) => n * RATIO;
export const opt = (o: string[]) => o.map((v) => ({ label: v, value: v }));

export const centerFace = (face: HTMLImageElement) => {
  const w = px(FACE_SIZE.w);
  const h = px(FACE_SIZE.h);
  const x = (CANVAS.w - w) / 2 + px(80);
  const y = (CANVAS.h - h) / 2 + px(50);

  return [face, x, y, w, h] as const;
};

export const centerHead = (head: HTMLImageElement) => {
  const w = px(HEAD_SIZE.w);
  const h = px(HEAD_SIZE.h);
  const x = (CANVAS.w - w) / 2;
  const y = (CANVAS.h - h) / 2;

  return [head, x, y, w, h] as const;
};

export const centerBody = (body: HTMLImageElement) => {
  const w = px(BODY_SIZE.w);
  const h = px(BODY_SIZE.h);
  const x = (CANVAS.w - w) / 2 - px(50);
  const y = (CANVAS.h - h) / 2 + px(545);

  return [body, x, y, w, h] as const;
};

export const centerAccessory = (body: HTMLImageElement) => {
  const w = px(ACCESSORY_SIZE.w);
  const h = px(ACCESSORY_SIZE.h);
  const x = (CANVAS.w - w) / 2 + px(32);
  const y = (CANVAS.h - h) / 2 + px(35);

  return [body, x, y, w, h] as const;
};

export const centerFacialHair = (body: HTMLImageElement) => {
  const w = px(FACIAL_HAIR_SIZE.w);
  const h = px(FACIAL_HAIR_SIZE.h);
  const x = (CANVAS.w - w) / 2 + px(33);
  const y = (CANVAS.h - h) / 2 + px(175);

  return [body, x, y, w, h] as const;
};

export type CenterObjectType = 'face' | 'head' | 'body' | 'accessory' | 'facialHair';

export const centralize = (type: CenterObjectType, el: HTMLImageElement) => {
  switch (type) {
    case 'face':
      return centerFace(el);
    case 'head':
      return centerHead(el);
    case 'body':
      return centerBody(el);
    case 'accessory':
      return centerAccessory(el);
    case 'facialHair':
      return centerFacialHair(el);
  }
};

export type OpenPeepsSerializerAttrs = {
  face: Face;
  head: Head;
  body: Body;
  accessory: Accessory;
  facialHair: FacialHair;
  background: string;
};

export function serialize(attrs: OpenPeepsSerializerAttrs) {
  return Object.entries(attrs)
    .map(([key, value]) => `${key}:${value}`)
    .join(';');
}

export function deserialize(str: string) {
  const attrs = str.split(';').map((attr) => {
    const [key, value] = attr.split(':');
    return [key, value];
  });

  return Object.fromEntries(attrs) as OpenPeepsSerializerAttrs;
}

export function pickRandom<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}
