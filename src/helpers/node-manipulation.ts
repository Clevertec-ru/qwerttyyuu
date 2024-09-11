import { Node, Edge } from '@xyflow/react';

export const createNode = (
  newNodeId: string,
  nodeType: string,
  onChange: (event: { target: { value: any } }) => void
): Node => {
  return {
    id: newNodeId,
    type: nodeType,
    data: {
      label: `Node ${newNodeId}`,
      editable: true,
      onChange,
      color: '#363650',
    },
    deletable: true,
    connectable: true,
    position: { x: Math.random() * 400, y: Math.random() * 300 },
  };
};

export const deleteNodeById = (nodes: Node[], edges: Edge[], nodeId: string) => {
  const filteredNodes = nodes.filter((node) => node.id !== nodeId);
  const filteredEdges = edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId);
  return { filteredNodes, filteredEdges };
};
