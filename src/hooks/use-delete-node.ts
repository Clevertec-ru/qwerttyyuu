import { useReactFlow } from '@xyflow/react';
import { useCallback } from 'react';

export const useDeleteNode = () => {
  const { setNodes } = useReactFlow();

  const deleteNode = useCallback((id: string) => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
  }, []);

  return { deleteNode };
};
