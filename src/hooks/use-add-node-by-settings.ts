import { Position, useReactFlow } from '@xyflow/react';
import { useCallback } from 'react';

import { CreateNodeType } from '../types/create-node-type.ts';
import { CustomNodesVariants, HandleVariants } from '../types/custom-nodes-variants.ts';
import { NodeUiVariants } from '../types/node-ui-variants.ts';

export const useAddNodeBySettings = () => {
  const { addNodes } = useReactFlow();


  const addNewNode = useCallback((settings: CreateNodeType) => {
    const isTriangle = settings.nodeShape === NodeUiVariants.Triangle || settings.nodeShape === NodeUiVariants.TriangleTop;
    const newNode = {
      id: settings.uniqueId,
      position: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      },
      data: {
        text: settings.nodeText, multipleHandles: {
          topHandles: Number(settings.topDotsCount) || 1,
          topHandleType: HandleVariants.TargetOnly,
          leftHandles: isTriangle ? 0 : Number(settings.leftDotsCount) || 1,
          leftHandleType: HandleVariants.TargetOnly,
          bottomHandles: Number(settings.botDotsCount) || 1,
          bottomHandleType: HandleVariants.SourceOnly,
          rightHandles: isTriangle ? 0 : Number(settings.rightDotsCount) || 1,
          rightHandleType: HandleVariants.SourceOnly,
        },
        wrapperStyle: settings.nodeShape,
      },
      type: CustomNodesVariants.TextUpdatedMultiple,
      height: Number(settings.height),
      width: Number(settings.width),
      targetPosition: Position.Left,
      sourcePosition: Position.Top,
    };
    addNodes(newNode);
  }, []);

  return { addNewNode };
};
