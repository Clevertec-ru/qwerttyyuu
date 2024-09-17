import '@xyflow/react/dist/style.css';
import { FC, PropsWithChildren, useCallback, useState } from 'react';
import {
  addEdge,
  applyNodeChanges,
  Node,
  NodeMouseHandler,
  OnConnect,
  OnNodesChange,
  Panel,
  ReactFlow,
  useEdgesState,
} from '@xyflow/react';

import { initialEdges } from '../../constants/initial-edges';
import { initialNodes } from '../../constants/initial-nodes';
import { fitViewOptions } from '../../constants/fit-view-options';
import { nodeTypes } from '../../constants/node-types';
import { PositionableEdge } from '../positionable-edge/positionable-edge';
import { defaultMarkerStyles } from '../../constants/default-marker-styles';
import { CustomEdgeVariants, EdgeType } from '../../types/edge-variants';
import { CustomPanel } from '../custom-panel';
import { Sidebar } from '../sidebar';

export const BaseReactFlow: FC<PropsWithChildren> = ({ children }) => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const proOptions = { hideAttribution: true };

  const edgeTypes = {
    positionableedge: PositionableEdge,
  };

  const onConnect: OnConnect = useCallback((params) => {
    const newEdge = {
      ...params,
      type: CustomEdgeVariants.Positionable,
      data: {
        type: EdgeType.SmoothStep,
        positionHandlers: [],
      },
      ...defaultMarkerStyles,
    };
    setEdges((eds) => addEdge(newEdge, eds));
  }, []);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) =>
      setNodes((nds) => {
        return applyNodeChanges(changes, nds);
      }),
    [setNodes]
  );

  const onDeleteNode = useCallback((id: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
  }, []);

  const nodesWithDelete = nodes.map((node) => {
    return {
      ...node,
      data: {
        ...node.data,
        onDelete: () => {
          onDeleteNode(node.id);
        },
      },
    };
  });

  const onNodeMouseLeave: NodeMouseHandler = useCallback((_, currNode) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (currNode.id !== node.id) return node;
        const prevData = node.data;
        return { ...node, data: prevData ? { ...prevData, isHovered: false } : { isHovered: false } };
      })
    );
  }, []);

  const onNodeMouseEnter: NodeMouseHandler = useCallback((_, currNode) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (currNode.id !== node.id) return node;
        const prevData = node.data;
        return { ...node, data: prevData ? { ...prevData, isHovered: true } : { isHovered: false } };
      })
    );
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <CustomPanel position='bottom-right' />
      <Panel position='top-right'>
        <Sidebar />
      </Panel>

      <ReactFlow
        nodes={nodesWithDelete}
        edges={edges}
        edgeTypes={edgeTypes}
        // defaultEdgeOptions={defaultEdgeOptions}
        fitView
        fitViewOptions={fitViewOptions}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeMouseEnter={onNodeMouseEnter}
        onNodeMouseLeave={onNodeMouseLeave}
        proOptions={proOptions}
      >
        {children}
      </ReactFlow>
    </div>
  );
};
