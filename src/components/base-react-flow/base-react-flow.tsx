import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Edge,
  EdgeMouseHandler,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodeDrag,
  OnNodesChange,
  ReactFlow,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { FC, PropsWithChildren, useCallback, useState } from 'react';

import { initialNodes } from '../../constants/initial-nodes';
import { defaultEdgeOptions } from '../../constants/default-edges-options';
import { fitViewOptions } from '../../constants/fit-view-options';
import { nodeTypes } from '../../constants/node-types';
import { edgeTypes } from '../../constants/edge-types';
import { getInitialEdges } from '../../helpers/get-initial-edges';
import { CustomEdgeVariants } from '../../types/edge-variants';
import { baseEdgesStyles, baseMarkerStyles } from '../../constants/base-edges-styles';
import { hoverEdgeStyles, defaultEdgeStyles } from '../../constants/edge-styles';

export const BaseReactFlow: FC<PropsWithChildren> = ({ children }) => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(() => getInitialEdges());

  const onConnect: OnConnect = useCallback(
    (connection) =>
      setEdges((eds) => {
        console.log('CONNECTION', connection);
        // console.log('EDGES', eds);
        const edgesTransformed = eds.map((elem) => {
          if (elem.type === CustomEdgeVariants.Marked) {
            const { markerEnd, markerStart, ...restElem } = elem;
            return restElem;
          }
          return elem;
        });
        return addEdge(connection, edgesTransformed);
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

  const onEdgeMouseEnter: EdgeMouseHandler = useCallback((_, currentEdge) => {
    setEdges((eds) =>
      eds.map((elem) => {
        if (elem.id !== currentEdge.id) return elem;

        const prevStyles = elem.style;
        return {
          ...elem,
          ...baseMarkerStyles,
          style: prevStyles ? { ...prevStyles, ...hoverEdgeStyles } : hoverEdgeStyles,
        };
      })
    );
  }, []);

  const onEdgeMouseLeave: EdgeMouseHandler = useCallback((_, currentEdge) => {
    setEdges((eds) =>
      eds.map((elem) => {
        if (elem.id !== currentEdge.id) return elem;

        const prevStyles = elem.style;
        return {
          ...elem,
          markerStart: undefined,
          markerEnd: undefined,
          style: prevStyles ? { ...prevStyles, ...defaultEdgeStyles } : defaultEdgeStyles,
        };
      })
    );
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        fitViewOptions={fitViewOptions}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onConnect={onConnect}
        onNodeDrag={onNodeDrag}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onEdgeMouseEnter={onEdgeMouseEnter}
        onEdgeMouseLeave={onEdgeMouseLeave}
        draggable
      >
        {children}
      </ReactFlow>
    </div>
  );
};
