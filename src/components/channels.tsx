import { ChannelStrip } from './channelstrip';

import './channels.scss';

import { ChannelData } from '../models';

interface ChannelsProps {
  channels: ChannelData[];
}

export function Channels({ channels }: ChannelsProps) {
  const channelStrips = [];
  for (let channel of channels)
    channelStrips.push(<ChannelStrip key={ 'Channel' + channel.index } label={ 'Channel #' + channel.index } channel={ channel }/>);
  return <div className="channels">{ channelStrips }</div>
}
