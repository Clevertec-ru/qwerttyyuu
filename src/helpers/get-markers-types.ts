import { MarkerType } from '@xyflow/react';

import { EdgeDataType, EdgeMarkersVariants } from '../types/edge-variants';
import { defaultMarkerStyles } from '../constants/default-marker-styles';

export const getMarkerTypes = (data: EdgeDataType | undefined) => {
  if (!data)
    return {
      markerStart: undefined,
      markerEnd: undefined,
    };

  switch (data.markerType) {
    case EdgeMarkersVariants.StartMarked: {
      return {
        markerStart: {
          type: MarkerType.ArrowClosed,
          ...defaultMarkerStyles,
        },
        markerEnd: undefined,
      };
    }
    case EdgeMarkersVariants.EndMarked: {
      return {
        markerStart: undefined,
        markerEnd: { type: MarkerType.ArrowClosed, ...defaultMarkerStyles },
      };
    }
    case EdgeMarkersVariants.BothMarked: {
      return {
        markerStart: { type: MarkerType.ArrowClosed, ...defaultMarkerStyles },
        markerEnd: { type: MarkerType.ArrowClosed, ...defaultMarkerStyles },
      };
    }
    default:
      return {
        markerStart: undefined,
        markerEnd: undefined,
      };
  }
};
