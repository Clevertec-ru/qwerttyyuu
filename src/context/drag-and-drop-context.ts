import { createContext, useContext } from 'react';

import { CustomNodesVariants } from '../types/custom-nodes-variants';

type DragAndDropContextType = {
  type: CustomNodesVariants;
  setType: (newType: CustomNodesVariants) => void;
};

const initialContext: DragAndDropContextType = {
  type: CustomNodesVariants.TextUpdated,
  setType: (newType) => {},
};

export const DragAndDropContext = createContext<DragAndDropContextType>(initialContext);
