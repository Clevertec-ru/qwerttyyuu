import { useContext } from 'react';

import { DragAndDropContext } from './drag-and-drop-context';

export const useDragAndDropContext = () => useContext(DragAndDropContext);
