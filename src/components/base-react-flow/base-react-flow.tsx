import '@xyflow/react/dist/style.css';
import { FC, PropsWithChildren, useCallback, useState } from 'react';
import {
  addEdge,
  applyNodeChanges,
  Node,
  OnConnect,
  OnNodeDrag,
  OnNodesChange,
  ReactFlow,
  useEdgesState,
} from '@xyflow/react';

import { initialEdges } from '../../constants/initial-edges';
import { initialNodes } from '../../constants/initial-nodes';
import { defaultEdgeOptions } from '../../constants/default-edges-options';
import { fitViewOptions } from '../../constants/fit-view-options';
import { nodeTypes } from '../../constants/node-types';
import { PositionableEdge } from '../positionable-edge/positionable-edge';

export const BaseReactFlow: FC<PropsWithChildren> = ({ children }) => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const edgeTypes = {
    positionableedge: PositionableEdge,
  };

  const onConnect: OnConnect = useCallback((params) => {
    const newEdge = {
      ...params,
      type: 'positionableedge',
      data: {
        type: 'default',
        positionHandlers: [],
      },
    };
    setEdges((eds) => addEdge(newEdge, eds));
  }, []);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) =>
      setNodes((nds) => {
        // console.log(nds, 'NODES CHANGE EVENT');
        return applyNodeChanges(changes, nds);
      }),
    [setNodes]
  );

  const onNodeDrag: OnNodeDrag = (_, node) => {
    // console.log('drag event', node.id, node.data);
  };
  const proOptions = { hideAttribution: true };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        fitViewOptions={fitViewOptions}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        onNodeDrag={onNodeDrag}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        proOptions={proOptions}
      >
        {children}
      </ReactFlow>
    </div>
  );
};
