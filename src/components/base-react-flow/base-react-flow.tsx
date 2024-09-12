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
  ReactFlow,
} from '@xyflow/react';

import { initialNodes } from '../../constants/initial-nodes';
import { defaultEdgeOptions } from '../../constants/default-edges-options';
import { fitViewOptions } from '../../constants/fit-view-options';
import { nodeTypes } from '../../constants/node-types';
import { edgeTypes } from '../../constants/edge-types';
import { CustomEdgeVariants } from '../../types/edge-variants';
import { baseMarkerStyles } from '../../constants/base-edges-styles';
import { hoverEdgeStyles, defaultEdgeStyles } from '../../constants/edge-styles';
import { initialEdges } from '../../constants/initial-edges';

export const BaseReactFlow: FC<PropsWithChildren> = ({ children }) => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onConnect: OnConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        type: CustomEdgeVariants.Positionable,
        data: {
          type: 'default',
          positionHandlers: [],
        },
      };

      setEdges((eds) => {
        const edgesTransformed = eds.map((elem) => {
          if (elem.type === CustomEdgeVariants.Marked) {
            const { markerEnd, markerStart, ...restElem } = elem;
            return restElem;
          }
          return elem;
        });
        return addEdge(newEdge, edgesTransformed);
      });
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
  const proOptions = { hideAttribution: true };

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
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        fitViewOptions={fitViewOptions}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        onNodeDrag={onNodeDrag}
        onNodesChange={onNodesChange}
        onEdgeMouseEnter={onEdgeMouseEnter}
        onEdgeMouseLeave={onEdgeMouseLeave}
        proOptions={proOptions}
      >
        {children}
      </ReactFlow>
    </div>
  );
};
