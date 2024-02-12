'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import OpenPeepsCanvas from './canvas';

import { useMemo, useState } from 'react';
import {
  Face,
  Body,
  Head,
  Accessory,
  FacialHair,
  FACES,
  HEADS,
  BODIES,
  ACCESSORIES,
  FACIAL_HAIR,
} from './constants';
import PropertySelector from './selector';
import { BackgroundPicker } from './background';
import CanvasExporter from './exporter';
import useOpenPeepsState from './use-openpeeps-state';

export type OpenPeepsProps = React.PropsWithChildren<{
  params?: string;
}>;

export default function OpenPeepsDialog({ children, params }: OpenPeepsProps) {
  const { state, set, serialize } = useOpenPeepsState(params);
  const exporter = useMemo(() => new CanvasExporter(), []);

  const handleOnSave = () => {
    console.log('save', serialize());
    //exporter.download();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[540px] max-w-[540px]">
        <DialogHeader>
          <DialogTitle className="text-left">Edit avatar</DialogTitle>
          <DialogDescription className="text-left">
            Make changes to your avatar here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 pt-2">
          <OpenPeepsCanvas
            face={state.face}
            head={state.head}
            body={state.body}
            accessory={state.accessory}
            facialHair={state.facialHair}
            background={state.background}
            exporter={exporter}
          />

          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <PropertySelector<Head>
                label="Head"
                options={[...HEADS]}
                selected={state.head}
                onChange={(v) => set('head', v)}
              />
            </div>

            <div>
              <PropertySelector<Face>
                label="Face"
                options={[...FACES]}
                selected={state.face}
                onChange={(v) => set('face', v)}
              />
            </div>

            <div>
              <PropertySelector<Accessory>
                label="Accessory"
                options={[...ACCESSORIES]}
                selected={state.accessory}
                onChange={(v) => set('accessory', v)}
              />
            </div>

            <div>
              <PropertySelector<FacialHair>
                label="Facial hair"
                options={[...FACIAL_HAIR]}
                selected={state.facialHair}
                onChange={(v) => set('facialHair', v)}
              />
            </div>

            <div>
              <PropertySelector<Body>
                label="Clothes"
                options={[...BODIES]}
                selected={state.body}
                onChange={(v) => set('body', v)}
              />
            </div>

            <div>
              <BackgroundPicker
                value={state.background}
                onChange={(v) => set('background', v)}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" onClick={handleOnSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
