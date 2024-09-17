import { FC, PropsWithChildren, useCallback, useMemo, useState } from 'react';

import { CustomNodesVariants, NumberNodeData, TextNodeData } from '../types/custom-nodes-variants';

import { DragAndDropContext } from './drag-and-drop-context';

export const DragAndDropContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [nodeType, setNodeType] = useState<CustomNodesVariants>();
  const [data, setData] = useState<TextNodeData | NumberNodeData>();

  const changeNodeType = useCallback((newType: CustomNodesVariants) => {
    setNodeType(newType);
  }, []);

  const changeDataType = useCallback((newData: TextNodeData | NumberNodeData) => {
    setData(newData);
  }, []);

  const value = {
    type: nodeType,
    data,
    setType: changeNodeType,
    setData: changeDataType,
  };

  return <DragAndDropContext.Provider value={value}>{children}</DragAndDropContext.Provider>;
};
