import '@xyflow/react/dist/style.css';
import { FC, PropsWithChildren, useCallback, useState } from 'react';
import {
  addEdge,
  applyNodeChanges,
  Edge,
  EdgeMouseHandler,
  Node,
  OnConnect,
  OnNodeDrag,
  OnNodesChange,
  OnReconnect,
  ReactFlow,
  reconnectEdge,
} from '@xyflow/react';

import { initialNodes } from '../../constants/initial-nodes';
import { defaultEdgeOptions } from '../../constants/default-edges-options';
import { fitViewOptions } from '../../constants/fit-view-options';
import { nodeTypes } from '../../constants/node-types';
import { edgeTypes } from '../../constants/edge-types';
import { initialEdges } from '../../constants/initial-edges';
import { defaultMarkerStyles } from '../../constants/default-marker-styles';

export const BaseReactFlow: FC<PropsWithChildren> = ({ children }) => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const proOptions = { hideAttribution: true };

  const onConnect: OnConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        ...defaultMarkerStyles,
        data: {
          type: 'default',
          positionHandlers: [],
          isHovered: false,
        },
      };

      setEdges((eds) => addEdge(newEdge, eds));
    },
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

  const onNodeDrag: OnNodeDrag = (_, node) => {
    // console.log('drag event', node.id, node.data);
  };

  const onReconnect: OnReconnect = useCallback(
    (oldEdge, newConnection) => setEdges((eds) => reconnectEdge(oldEdge, newConnection, eds)),
    []
  );

  const onEdgeMouseEnter: EdgeMouseHandler = useCallback((_, currentEdge) => {
    setEdges((eds) =>
      eds.map((elem) => {
        if (elem.id !== currentEdge.id) return elem;

        const prevData = elem.data;
        return {
          ...elem,
          data: prevData ? { ...prevData, isHovered: true } : { isHovered: true },
        };
      })
    );
  }, []);

  const onEdgeMouseLeave: EdgeMouseHandler = useCallback((_, currentEdge) => {
    setEdges((eds) =>
      eds.map((elem) => {
        if (elem.id !== currentEdge.id) return elem;

        const prevData = elem.data;
        return {
          ...elem,
          data: prevData ? { ...prevData, isHovered: false } : { isHovered: false },
        };
      })
    );
  }, []);

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
        onReconnect={onReconnect}
        onNodeDrag={onNodeDrag}
        onNodesChange={onNodesChange}
        onEdgeMouseLeave={onEdgeMouseLeave}
        onEdgeMouseEnter={onEdgeMouseEnter}
        proOptions={proOptions}
      >
        {children}
      </ReactFlow>
    </div>
  );
};
