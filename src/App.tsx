import { ReactFlowProvider } from '@xyflow/react';

import { Diagram } from './components/diagram';
import { DragAndDropContextProvider } from './context/drag-and-drop-context-provider';

function App() {
  return (
    <ReactFlowProvider>
      <DragAndDropContextProvider>
        <Diagram />
      </DragAndDropContextProvider>
    </ReactFlowProvider>
  );
}

export default App;
