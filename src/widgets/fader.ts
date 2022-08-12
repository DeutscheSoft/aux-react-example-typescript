import { Fader as AuxFader } from '@deutschesoft/aux-widgets/src/index.pure';
import { componentFromWidget } from '@deutschesoft/use-aux-widgets';

const FaderBindings = {
  value$: {
    name: 'value',
  },
};

export const Fader = componentFromWidget(AuxFader, FaderBindings, {
  min: -96,
  max: 24,
  layout: 'left',
});
