import './App.scss';
import { Channels } from './components/channels';
import { channels } from './models';
import { useBackend } from '@deutschesoft/use-aux-widgets';
import { LocalBackend } from '@deutschesoft/awml/src/index.pure';

function createLocalBackend() {
  return new LocalBackend({ });
}

function App() {

  const [ backend, ] = useBackend('local', createLocalBackend);

  console.log('backend %o active', backend);

  return (
    <div className="app">
      <Channels channels={ channels } />
    </div>
  );
}

export default App
