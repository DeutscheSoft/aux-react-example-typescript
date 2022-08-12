import { MultiMeter } from '@deutschesoft/aux-widgets/src/index.pure';
import { componentFromWidget } from '@deutschesoft/use-aux-widgets';

const StereoMeterBindings = {
  level$: {
    name: 'value',
  },
};

export const StereoMeter = componentFromWidget(MultiMeter, StereoMeterBindings, {
  count: 2,
  foreground: 'white',
  falling: 32,
  min: -96,
  max: 24,
}, "stereometer");
