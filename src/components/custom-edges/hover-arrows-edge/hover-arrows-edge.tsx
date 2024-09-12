import { getStraightPath, BaseEdge, type EdgeProps } from '@xyflow/react';

import styles from './hover-arrows-edge.module.css';
import { CustomEdge } from '../../../types/edge-variants';

export const HoverArrowsEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  markerStart,
  markerEnd,
  style = {},
}: EdgeProps<CustomEdge>) => {
  const [edgePath] = getStraightPath({ sourceX, sourceY, targetX, targetY });

  return (
    <>
      <BaseEdge
        interactionWidth={5}
        className={styles.path}
        id={id}
        path={edgePath}
        style={style}
        markerEnd={markerEnd}
        markerStart={markerStart}
      />
    </>
  );
};
