import React, { useState, useCallback } from 'react';
import { ReactFlow, useNodesState, useEdgesState, addEdge, Controls, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { ColorPickerNode } from '../color-picker-node/color-picker-node';
import { ResizableNodeSelected } from '../resizable-node/resizable-node';
import { addNodeText, deleteNodeText } from '../../constants/button-text';
import { nodeOptions } from '../../constants/node-options';
import { CustomNode } from '../custom-node/custom-node';
import { Map } from '../map';
import { createNode, deleteNodeById } from '../../helpers/node-manipulation';

import styles from './custom-node-flow.module.css';

const initBgColor = '#363650';

const connectionLineStyle = { stroke: 'var(--white)' };
const snapGrid: [number, number] = [20, 20];
const nodeTypes = {
  selectorNode: ColorPickerNode,
  resizableNodeSelected: ResizableNodeSelected,
  custom: CustomNode,
};

const defaultViewport = { x: 0, y: 0, zoom: 1 };

export const CustomNodeFlow: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [bgColor, setBgColor] = useState<string>(initBgColor);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [nodeType, setNodeType] = useState<string>('resizableNodeSelected');
  const proOptions = { hideAttribution: true };

  const onChange = (event: { target: { value: string } }) => {
    setNodes((nds) =>
      nds.map((node) => {
        const color = event.target.value;

        setBgColor(color);

        return {
          ...node,
          data: {
            ...node.data,
            color,
          },
        };
      })
    );
  };

  const addNode = () => {
    const newNodeId = (nodes.length + 1).toString();
    const newNode = createNode(newNodeId, nodeType, onChange);
    setNodes((nds) => [...nds, newNode]);
  };

  const deleteSelectedNode = () => {
    if (selectedNodeId) {
      const { filteredNodes, filteredEdges } = deleteNodeById(nodes, edges, selectedNodeId);
      setNodes(filteredNodes);
      setEdges(filteredEdges);
      setSelectedNodeId(null);
    }
  };

  const onNodeClick = (e: React.MouseEvent, node: any) => {
    setSelectedNodeId(node.id);
  };

  const onConnect = useCallback(
    (params: { source: string; target: string; sourceHandle?: string | null; targetHandle?: string | null }) => {
      const newEdge: Edge = {
        id: `${params.source}-${params.target}`,
        className: styles.edge,
        source: params.source,
        target: params.target,
        sourceHandle: params.sourceHandle ?? undefined,
        targetHandle: params.targetHandle ?? undefined,
      };

      setEdges((eds) => addEdge(newEdge, eds));
    },
    []
  );

  return (
    <div className={styles.nodeFlowContainer}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        style={{ background: bgColor }}
        nodeTypes={nodeTypes}
        connectionLineStyle={connectionLineStyle}
        snapToGrid={true}
        snapGrid={snapGrid}
        defaultViewport={defaultViewport}
        fitView
        proOptions={proOptions}
      >
        <Map bgColor={bgColor} />
        <Controls />
      </ReactFlow>
      <div className={styles.buttonsRow}>
        <div className={styles.nodeTypeSelector}>
          <label htmlFor='node-type'>Выберите тип добавляемого узла: </label>
          <select id='node-type' value={nodeType} onChange={(e) => setNodeType(e.target.value)}>
            {nodeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <button onClick={addNode}>{addNodeText}</button>
        <button onClick={deleteSelectedNode}>{deleteNodeText}</button>
      </div>
    </div>
  );
};
