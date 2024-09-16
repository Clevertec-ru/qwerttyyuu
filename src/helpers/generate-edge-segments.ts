import { PositionHandler } from '../types/edge-variants';

export type GenerateEdgeSegmentsProps = {
  edgeSegmentsCount: number;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition: string | null;
  targetPosition: string | null;
  positionHandlers: PositionHandler[];
  pathFunction: Function;
};

export const generateEdgeSegments = ({
  edgeSegmentsCount,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  positionHandlers,
  pathFunction,
}: GenerateEdgeSegmentsProps) => {
  const segmentsArray = [];

  for (let i = 0; i < edgeSegmentsCount; i++) {
    let segmentSourceX, segmentSourceY, segmentTargetX, segmentTargetY;

    if (i === 0) {
      segmentSourceX = sourceX;
      segmentSourceY = sourceY;
    } else {
      const handler = positionHandlers[i - 1];
      segmentSourceX = handler.x;
      segmentSourceY = handler.y;
    }

    if (i === edgeSegmentsCount - 1) {
      segmentTargetX = targetX;
      segmentTargetY = targetY;
    } else {
      const handler = positionHandlers[i];
      segmentTargetX = handler.x;
      segmentTargetY = handler.y;
    }

    const [edgePath, labelX, labelY] = pathFunction({
      sourceX: segmentSourceX,
      sourceY: segmentSourceY,
      sourcePosition,
      targetX: segmentTargetX,
      targetY: segmentTargetY,
      targetPosition,
    });
    segmentsArray.push({ edgePath, labelX, labelY });
  }

  return segmentsArray;
};
