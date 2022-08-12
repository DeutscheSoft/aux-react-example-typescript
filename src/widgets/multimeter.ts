import { MultiMeter as AuxMultiMeter } from '@deutschesoft/aux-widgets/src/index.pure';
import { componentFromWidget } from '@deutschesoft/use-aux-widgets';

const MultiMeterBindings = {
  level$: {
    name: 'value',
  },
};

export const MultiMeter = componentFromWidget(AuxMultiMeter, MultiMeterBindings);
