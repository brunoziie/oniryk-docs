import { useState } from 'react';
import { BODIES, FACES, HEADS } from './constants';
import { OpenPeepsSerializerAttrs, deserialize, serialize, pickRandom } from './utils';

export default function useOpenPeepsState(initial?: string) {
  const values = initial ? deserialize(initial) : null;

  const [state, setState] = useState<OpenPeepsSerializerAttrs>({
    face: values?.face || pickRandom([...FACES]),
    head: values?.head || pickRandom([...HEADS]),
    body: values?.body || pickRandom([...BODIES]),
    accessory: values?.accessory || '*_none',
    facialHair: values?.facialHair || '*_none',
    background: values?.background || '#efefef',
  });

  const set: <T extends keyof OpenPeepsSerializerAttrs>(
    key: T,
    value: OpenPeepsSerializerAttrs[T]
  ) => void = (key, value) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return {
    set,
    state,
    serialize: () => serialize(state),
  };
}
