import { DynamicValue, map, fromSubscription, combineLatest } from '@deutschesoft/awml/src/index.pure.js';

function interval(n: number) {
  return fromSubscription((cb) => {
    const id = setInterval(cb, n);
    return () => {
      clearInterval(id);
    };
  });
}

interface EqBandData {
  gain$: DynamicValue<number>;
  frequency$: DynamicValue<number>;
  q$: DynamicValue<number>;
}

export interface ChannelData {
  levelLeft$: DynamicValue<number>;
  levelRight$: DynamicValue<number>;
  levelStereo$: DynamicValue<[number, number]>;
  gain$: DynamicValue<number>;
  mute$: DynamicValue<boolean>;
  equalizer: {
    band1: EqBandData;
    band2: EqBandData;
    band3: EqBandData;
  };
  index: number;
}

function createChannelModel(index: number): ChannelData {

  // Between -96 and 24 db
  const gain$ = DynamicValue.fromConstant(-64);
  const mute$ = DynamicValue.fromConstant(!!(index & 1));

  const levelLeft$ = map(interval(100), () => {
    if (mute$.value) return -96;
    return (gain$.value + 96) * Math.random() - 96;
  });
  const levelRight$ = map(interval(100), () => {
    if (mute$.value) return -96;
    return (gain$.value + 96) * Math.random() - 96;
  });
  const levelStereo$ = combineLatest([ levelLeft$, levelRight$ ]);

  return {
    levelLeft$,
    levelRight$,
    levelStereo$,
    gain$,
    index: index,
    mute$,
    equalizer: {
      band1: {
        gain$: DynamicValue.fromConstant(6),
        frequency$: DynamicValue.fromConstant(1000),
        q$: DynamicValue.fromConstant(1),
      },
      band2: {
        gain$: DynamicValue.fromConstant(6),
        frequency$: DynamicValue.fromConstant(4000),
        q$: DynamicValue.fromConstant(1),
      },
      band3: {
        gain$: DynamicValue.fromConstant(6),
        frequency$: DynamicValue.fromConstant(10000),
        q$: DynamicValue.fromConstant(1),
      },
    }
  }
}

export const channels = new Array(4).fill(0).map((v, index) => {
  return createChannelModel(index + 1);
});
