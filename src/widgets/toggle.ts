import { Toggle as AuxToggle } from '@deutschesoft/aux-widgets/src/index.pure';
import { componentFromWidget } from '@deutschesoft/use-aux-widgets';

const ToggleBindings = {
  state$: {
    name: 'state',
  },
};

export const Toggle = componentFromWidget(AuxToggle, ToggleBindings);
