import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Edge,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodeDrag,
  OnNodesChange,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { FC, PropsWithChildren, useCallback, useState } from 'react';

import { initialEdges } from '../../constants/initial-edges';
import { initialNodes } from '../../constants/initial-nodes';
import { defaultEdgeOptions } from '../../constants/default-edges-options';
import { fitViewOptions } from '../../constants/fit-view-options';
import { nodeTypes } from '../../constants/node-types';

export const BaseReactFlow: FC<PropsWithChildren> = ({ children }) => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onConnect: OnConnect = useCallback(
    (connection) =>
      setEdges((eds) => {
        // console.log('CONNECTION', connection);
        // console.log('EDGES', eds);
        return addEdge(connection, eds);
      }),
    [setEdges]
  );

  const onNodesChange: OnNodesChange = useCallback(
    (changes) =>
      setNodes((nds) => {
        // console.log(nds, 'NODES CHANGE EVENT');
        return applyNodeChanges(changes, nds);
      }),
    [setNodes]
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) =>
      setEdges((eds) => {
        // console.log(eds, 'EDGES CHANGE EVENT');
        return applyEdgeChanges(changes, eds);
      }),
    [setEdges]
  );

  const onNodeDrag: OnNodeDrag = (_, node) => {
    // console.log('drag event', node.id, node.data);
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        fitViewOptions={fitViewOptions}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        onNodeDrag={onNodeDrag}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        draggable
      >
        {children}
      </ReactFlow>
    </div>
  );
};
