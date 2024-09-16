import { useReactFlow } from '@xyflow/react';
import { useCallback, useId } from 'react';

export const useAddSameNode = (id: string) => {
  const uniqueId = useId();
  const { addNodes, getNode } = useReactFlow();
  const currNode = getNode(id);

  const addNewNode = useCallback(() => {
    if (!currNode) return;
    const newNode = {
      ...currNode,
      id: uniqueId,
      position: {
        x: currNode?.position ? currNode.position.x + 60 : 60,
        y: currNode?.position ? currNode.position.y + 50 : 50,
      },
    };
    addNodes(newNode);
  }, []);

  return { addNewNode };
};
