import { Position, useReactFlow } from '@xyflow/react';
import { useCallback, useId } from 'react';

import { CreateNodeType } from '../types/create-node-type.ts';
import { CustomNodesVariants, HandleVariants } from '../types/custom-nodes-variants.ts';
import { NodeUiVariants } from '../types/node-ui-variants.ts';

export const useAddNodeBySettings = () => {
  const uniqueId = useId();
  const { addNodes } = useReactFlow();


  const addNewNode = useCallback((settings: CreateNodeType) => {
    const newNode = {
      id: uniqueId,
      position: {
        x: 100,
        y: 100,
      },
      data: { label: settings.nodeText, multipleHandles: {
          topHandles: 3,
          topHandleType: HandleVariants.TargetOnly,
          leftHandles: 2,
          leftHandleType: HandleVariants.TargetOnly,
        },
        wrapperStyle: NodeUiVariants.RectangleOutlined,},
      type: CustomNodesVariants.TextUpdatedMultiple,
      height: 40,
      width: 180,
      targetPosition: Position.Left,
      sourcePosition: Position.Top,
    };
    addNodes(newNode);
  }, []);

  return { addNewNode };
};
