import { MarkerType } from '@xyflow/react';

import { CustomEdgeVariants, EdgeMarkersVariants } from '../types/edge-variants';

import { defaultMarkerStyles } from './default-marker-styles';

export const baseEdgesStyles = {
  type: CustomEdgeVariants.Marked,
  data: { markerType: EdgeMarkersVariants.BothMarked },
};

export const baseMarkerStyles = {
  markerStart: {
    type: MarkerType.ArrowClosed,
    ...defaultMarkerStyles,
  },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    ...defaultMarkerStyles,
  },
};
