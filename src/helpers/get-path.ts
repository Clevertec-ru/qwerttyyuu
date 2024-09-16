import { getBezierPath, getSmoothStepPath, getStraightPath } from '@xyflow/react';

export const getPathFunction = (type: string) => {
  switch (type) {
    case 'straight':
      return getStraightPath;
    case 'smoothstep':
      return getSmoothStepPath;
    default:
      return getBezierPath;
  }
};
