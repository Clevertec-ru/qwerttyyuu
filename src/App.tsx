import { ReactFlowProvider } from '@xyflow/react';
import { useState } from 'react';

import styles from './App.module.css';
import { Diagram } from './components/diagram';

function App() {
  const [isDiagramVisible, setIsDiagramVisible] = useState(true);

  const toggleDiagram = () => setIsDiagramVisible((prev) => !prev);

  return (
    <ReactFlowProvider>
      <button className={styles.demoButton} onClick={toggleDiagram}>
        {isDiagramVisible ? 'Hide Diagram' : 'Show Diagram'}
      </button>
      {isDiagramVisible && <Diagram />}
    </ReactFlowProvider>
  );
}

export default App;
