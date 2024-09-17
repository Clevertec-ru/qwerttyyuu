import { FC, PropsWithChildren, useCallback, useMemo, useState } from 'react';

import { CustomNodesVariants } from '../types/custom-nodes-variants';

import { DragAndDropContext } from './drag-and-drop-context';

export const DragAndDropContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [nodeType, setNodeType] = useState<CustomNodesVariants>(CustomNodesVariants.TextUpdated);

  const changeNodeType = useCallback((newType: CustomNodesVariants) => {
    setNodeType(newType);
  }, []);

  const value = useMemo(
    () => ({
      type: nodeType,
      setType: changeNodeType,
    }),
    [nodeType, changeNodeType]
  );

  return <DragAndDropContext.Provider value={value}>{children}</DragAndDropContext.Provider>;
};
