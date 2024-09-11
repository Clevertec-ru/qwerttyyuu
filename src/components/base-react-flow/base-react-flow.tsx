import { ReactFlow } from '@xyflow/react';
import { initialEdges } from '../../constants/initial-edges';
import { initialNodes } from '../../constants/initial-nodes';
import { defaultEdgeOptions } from '../../constants/default-edges-options';
import { fitViewOptions } from '../../constants/fit-view-options';
import { FC, PropsWithChildren } from 'react';
import { nodeTypes } from '../../constants/node-types';

export const BaseReactFlow: FC<PropsWithChildren> = ({ children }) => (
  <div style={{ width: '100vw', height: '100vh' }}>
    <ReactFlow
      nodes={initialNodes}
      edges={initialEdges}
      defaultEdgeOptions={defaultEdgeOptions}
      fitView
      fitViewOptions={fitViewOptions}
      nodeTypes={nodeTypes}
    >
      {children}
    </ReactFlow>
  </div>
);
