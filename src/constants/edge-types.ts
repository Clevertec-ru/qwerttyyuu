import { EdgeTypes } from '@xyflow/react';

import { CustomEdgeVariants } from '../types/edge-variants';
import { HoverArrowsEdge } from '../components/custom-edges/hover-arrows-edge';

export const edgeTypes: EdgeTypes = { [CustomEdgeVariants.Marked]: HoverArrowsEdge };
