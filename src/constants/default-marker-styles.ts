import { MarkerType } from '@xyflow/react';

const markerStyles = { width: 20, height: 30, color: 'var(--demo-attention)', type: MarkerType.ArrowClosed };

export const defaultMarkerStyles = {
  markerStart: markerStyles,
  markerEnd: markerStyles,
};
