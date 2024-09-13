import { useReactFlow } from '@xyflow/react';
import { useId } from 'react';

export const UseAddSameNode = (id: string) => {
  const uniqueId = useId();
  const { addNodes, addEdges, getNode } = useReactFlow();
  const currentNode = getNode(id);
};
