import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { CustomNodeFlow } from './components/custome-node-flow/custom-node-flow';
import { Home } from './components/home/home';
import { Diagram } from './components/diagram';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/demo' element={<CustomNodeFlow />} />
        <Route path='/diagram' element={<Diagram />} />
      </Routes>
    </Router>
  );
}

export default App;
