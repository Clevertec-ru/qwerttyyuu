import { Background } from 'reactflow';
import { Controls } from '@xyflow/react';

import { BaseReactFlow } from '../base-react-flow';

export const Diagram = () => (
  <>
    <button>Demo</button>
    <BaseReactFlow>
      <Background />
      <Controls />
    </BaseReactFlow>
  </>
);
