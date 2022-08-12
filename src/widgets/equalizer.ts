import { Equalizer as AuxEqualizer } from '@deutschesoft/aux-widgets/src/index.pure';
import { componentFromWidget } from '@deutschesoft/use-aux-widgets';

const EqualizerBindings = {
};

export const Equalizer = componentFromWidget(AuxEqualizer, EqualizerBindings, {
}, 'equalizer');
