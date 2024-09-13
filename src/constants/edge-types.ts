import { EdgeTypes } from '@xyflow/react';

import { CustomEdgeVariants } from '../types/edge-variants';
import { HoverArrowsEdge } from '../components/hover-arrows-edge';
import { PositionableEdge } from '../components/positionable-edge/positionable-edge';

export const edgeTypes: EdgeTypes = {
  [CustomEdgeVariants.Marked]: HoverArrowsEdge,
  [CustomEdgeVariants.Positionable]: PositionableEdge,
};
