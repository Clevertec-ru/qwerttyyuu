import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ReactFlowProvider } from 'reactflow';
import { CustomNodeFlow } from './components/custome-node-flow/custom-node-flow';
import { Home } from './components/home/home';
import { Diagram } from './components/diagram';

function App() {
  return (
    <ReactFlowProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/demo' element={<CustomNodeFlow />} />
          <Route path='/diagram' element={<Diagram />} />
        </Routes>
      </Router>
    </ReactFlowProvider>
  );
}

export default App;
