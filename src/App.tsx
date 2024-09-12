import { ReactFlowProvider } from '@xyflow/react';

import { Diagram } from './components/diagram';

function App() {
  return (
    <ReactFlowProvider>
      <Diagram />
    </ReactFlowProvider>
  );
}

export default App;
