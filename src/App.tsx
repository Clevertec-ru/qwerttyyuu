import { Background, Controls } from '@xyflow/react';
import { BaseReactFlow } from './components/base-react-flow';

function App() {
  return (
    <>
      <button>Demo</button>
      <BaseReactFlow>
        <Background />
        <Controls />
      </BaseReactFlow>
    </>
  );
}

export default App;
