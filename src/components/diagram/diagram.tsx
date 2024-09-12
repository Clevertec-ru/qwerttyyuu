import { Background } from 'reactflow';
import { Controls } from '@xyflow/react';

import { BaseReactFlow } from '../base-react-flow';

export const Diagram = () => (
  <>
    <BaseReactFlow>
      <Background />
      <Controls />
    </BaseReactFlow>
  </>
);
