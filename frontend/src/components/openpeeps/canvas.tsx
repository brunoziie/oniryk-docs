import { useCallback, useEffect, useRef } from 'react';
import { CANVAS, Face, Head, Body, Accessory, FacialHair } from './constants';
import { loadAsset as load, loadMany } from './loader';
import { centralize } from './utils';
import CanvasExporter from './exporter';

export type OpenPeepsCanvasProps = {
  face?: Face;
  head?: Head;
  body?: Body;
  accessory?: Accessory;
  facialHair?: FacialHair;
  background?: string;
  exporter?: CanvasExporter;
};

export default function OpenPeepsCanvas({
  face,
  head,
  body,
  accessory,
  facialHair,
  background = '#f5f5f5',
  exporter,
}: OpenPeepsCanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const deps = [face, head, body, background, accessory, facialHair];

  const draw = useCallback(async () => {
    if (!ref.current) return;

    const assets = await loadMany([
      load(`face/${String(face)}.svg`),
      load(`head/${String(head)}.svg`),
      load(`body/${String(body)}.svg`),
      load(`accessories/${accessory}.svg`),
      load(`facial-hair/${facialHair}.svg`),
    ]);

    const [_face, _head, _body, _accessory, _facialHair] = assets;
    const ctx = ref.current.getContext('2d')!;

    // Clear canvas
    ctx.clearRect(0, 0, CANVAS.w, CANVAS.h);

    // Draw background
    ctx.beginPath();
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, CANVAS.w, CANVAS.h);
    ctx.stroke();

    // Draw assets
    ctx.drawImage(...centralize('body', _body));
    ctx.drawImage(...centralize('head', _head));
    ctx.drawImage(...centralize('face', _face));
    ctx.drawImage(...centralize('accessory', _accessory));
    ctx.drawImage(...centralize('facialHair', _facialHair));
  }, deps);

  useEffect(() => {
    draw();
  }, deps);

  useEffect(() => {
    exporter && exporter.setCanvas(ref.current!);
  }, [exporter, ref.current]);

  return (
    <canvas
      className="h-[200px] w-[200px] rounded-full"
      ref={ref}
      id="canvas"
      width={CANVAS.w}
      height={CANVAS.h}
    ></canvas>
  );
}
