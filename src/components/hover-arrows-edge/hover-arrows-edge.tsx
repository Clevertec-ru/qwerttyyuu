import { getStraightPath, BaseEdge, type EdgeProps } from '@xyflow/react';
import { memo } from 'react';

import { CustomEdge } from '../../types/edge-variants';

import styles from './hover-arrows-edge.module.css';

export const HoverArrowsEdge = memo(
  ({ id, sourceX, sourceY, targetX, targetY, markerStart, markerEnd, style = {}, data }: EdgeProps<CustomEdge>) => {
    const [edgePath] = getStraightPath({ sourceX, sourceY, targetX, targetY });

    return (
      <>
        <BaseEdge
          interactionWidth={5}
          className={styles.path}
          id={id}
          path={edgePath}
          style={style}
          markerEnd={data?.isHovered ? markerEnd : undefined}
          markerStart={data?.isHovered ? markerStart : undefined}
        />
      </>
    );
  }
);
