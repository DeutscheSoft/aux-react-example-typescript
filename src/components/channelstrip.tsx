import { Equalizer, Fader, Label, StereoMeter, Toggle } from '../widgets';
import {
  useWidget,
  useWidgetInteraction,
  useDynamicValueReadonly,
  useDynamicValue,
  useWidgetBinding
} from '@deutschesoft/use-aux-widgets';
import { useState } from 'react';
import * as React from 'react';

import { EqBand } from '@deutschesoft/aux-widgets/src/index.pure';

import './channelstrip.scss';

import { ChannelData } from '../models';

interface ChannelStripProps {
  channel: ChannelData;
  label: string;
}

export function ChannelStrip({ channel, label }: ChannelStripProps) {
  const { levelStereo$, gain$, mute$, equalizer } = channel;
  const [ fader, faderRef ] = useState(null);
  const faderInteraction = useWidgetInteraction(fader);
  const muted = useDynamicValueReadonly(mute$, false);
  const [ , setMute ] = useDynamicValue(mute$, false);

  const band1 = useWidget(EqBand, {
    type: 'parametric',
    label: 'Band #1',
  });
  const band2 = useWidget(EqBand, {
    type: 'parametric',
    label: 'Band #2',
  });

  if (faderInteraction && muted)
    setMute(false);

  function onClick(ev: MouseEvent) {
    console.log('label clicked', ev);
  }

  const classList = [ 'channelstrip' ];

  if (faderInteraction)
    classList.push('interacting');

  if (muted)
    classList.push('muted');

  useWidgetBinding(band1, [
    {
      name: 'gain',
      backendValue: equalizer.band1.gain$,
    },
    {
      name: 'freq',
      backendValue: equalizer.band1.frequency$,
    },
    {
      name: 'q',
      backendValue: equalizer.band1.q$,
    }
  ]);

  useWidgetBinding(band2, [
    {
      name: 'gain',
      backendValue: equalizer.band2.gain$,
    },
    {
      name: 'freq',
      backendValue: equalizer.band2.frequency$,
    },
    {
      name: 'q',
      backendValue: equalizer.band2.q$,
    }
  ]);

  return (
    <div className={ classList.join(' ') }>
      <Equalizer bands={ muted ? [] : [ band1, band2 ] } />
      <Label onClick={ onClick } className="label" label={label} />
      <Fader widgetRef={ faderRef } className="fader" value$={ gain$ }/>
      <StereoMeter className="meter" level$={ levelStereo$ }/>
      <Toggle className="mute" label="Mute" state$={ mute$ }/>
    </div>
  )
}
