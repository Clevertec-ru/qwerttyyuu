import { useState } from 'react';
import {
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  getSmoothStepPath,
  getStraightPath,
  useReactFlow,
} from '@xyflow/react';

import ClickableEdge from '../clikable-edge/clikable-edge';

import './positionable-edge.css';

type PositionHandler = {
  x: number;
  y: number;
  active: number | undefined;
};

type EdgeData = {
  type: string;
  positionHandlers: PositionHandler[];
};

type PositionableEdgeProps = EdgeProps & {
  data: EdgeData;
};

export function PositionableEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  markerStart,
  data,
}: PositionableEdgeProps) {
  const xyFlowInstance = useReactFlow();

  const positionHandlers = data.positionHandlers ?? [];

  const type = data?.type ?? 'default';
  const edgeSegmentsCount = positionHandlers.length + 1;
  let edgeSegmentsArray = [];

  let pathFunction;
  switch (type) {
    case 'straight':
      pathFunction = getStraightPath;
      break;
    case 'smoothstep':
      pathFunction = getSmoothStepPath;
      break;
    default:
      pathFunction = getBezierPath;
  }

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
    edgeSegmentsArray.push({ edgePath, labelX, labelY });
  }

  return (
    <>
      {edgeSegmentsArray.map(({ edgePath }, index) => (
        <ClickableEdge
          id={`${id}_segment_${index}`}
          onClick={(event) => {
            const position = xyFlowInstance.screenToFlowPosition({
              x: event.clientX,
              y: event.clientY,
            });

            xyFlowInstance.setEdges((edges) => {
              const edgeIndex = edges.findIndex((edge) => edge.id === id);
              const { positionHandlers } = edges[edgeIndex].data as EdgeData;

              positionHandlers.splice(index, 0, {
                x: position.x,
                y: position.y,
                active: undefined,
              });

              return edges;
            });
          }}
          key={`edge${id}_segment${index}`}
          path={edgePath}
          markerEnd={markerEnd}
          style={{
            ...style,
            stroke: '#b1b1b7',
          }}
        />
      ))}
      {positionHandlers.map(({ x, y, active }: PositionHandler, handlerIndex: number) => (
        <EdgeLabelRenderer key={`edge${id}_handler${handlerIndex}`}>
          <div
            className='nopan positionHandlerContainer'
            style={{
              transform: `translate(-50%, -50%) translate(${x}px,${y}px)`,
            }}
          >
            <div
              className={`positionHandlerEventContainer ${active} ${`${active ?? -1}` !== '-1' ? 'active' : ''}`}
              data-active={active ?? -1}
              onMouseMove={(event) => {
                const target = event.target as HTMLElement;
                let activeEdge = parseInt(target.dataset.active ?? '-1');
                if (activeEdge === -1) {
                  return;
                }
                const position = xyFlowInstance.screenToFlowPosition({
                  x: event.clientX,
                  y: event.clientY,
                });
                xyFlowInstance.setEdges((edges) => {
                  const { positionHandlers } = edges[activeEdge].data as EdgeData;

                  positionHandlers[handlerIndex] = {
                    x: position.x,
                    y: position.y,
                    active: activeEdge,
                  };
                  return edges;
                });
              }}
              onMouseUp={() => {
                xyFlowInstance.setEdges((edges) => {
                  edges.forEach((edge) => {
                    const { positionHandlers } = edge.data as EdgeData;

                    positionHandlers.forEach((handler) => {
                      handler.active = -1;
                    });
                  });
                  return edges;
                });
              }}
            >
              <button
                className='positionHandler'
                data-active={active ?? -1}
                onMouseDown={() => {
                  xyFlowInstance.setEdges((edges) => {
                    const edgeIndex = edges.findIndex((edge) => edge.id === id);
                    const { positionHandlers } = edges[edgeIndex].data as EdgeData;

                    positionHandlers[handlerIndex].active = edgeIndex;
                    return edges;
                  });
                }}
                onContextMenu={(event) => {
                  event.preventDefault();
                  xyFlowInstance.setEdges((edges) => {
                    const edgeIndex = edges.findIndex((edge) => edge.id === id);
                    const { positionHandlers } = edges[edgeIndex].data as EdgeData;

                    positionHandlers.splice(handlerIndex, 1);
                    return edges;
                  });
                }}
              ></button>
            </div>
          </div>
        </EdgeLabelRenderer>
      ))}
    </>
  );
}
