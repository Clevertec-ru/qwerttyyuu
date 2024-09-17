import { createContext } from 'react';

import { CustomNodesVariants, NumberNodeData, TextNodeData } from '../types/custom-nodes-variants';

type DragAndDropContextType = {
  type: CustomNodesVariants | undefined;
  data: TextNodeData | NumberNodeData | undefined;
  setType: (newType: CustomNodesVariants) => void;
  setData: (newData: TextNodeData | NumberNodeData) => void;
};

const initialContext: DragAndDropContextType = {
  type: CustomNodesVariants.TextUpdated,
  data: {} as TextNodeData,
  setType: (newType) => {},
  setData: (newData) => {},
};

export const DragAndDropContext = createContext<DragAndDropContextType>(initialContext);
