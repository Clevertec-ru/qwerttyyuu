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
import {
  handleContextMenu,
  handleLongPress,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleTouchMove,
} from '../../helpers/positionable-edge-handlers';

type PositionHandler = {
  x: number;
  y: number;
  active: number | undefined;
};

export type EdgeData = {
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

  const handleDeleteEdge = () => {
    xyFlowInstance.setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

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
          onDelete={handleDeleteEdge}
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
              onMouseMove={(event) => handleMouseMove(event, active, handlerIndex, xyFlowInstance)}
              onTouchMove={(event) => handleTouchMove(event, active, handlerIndex, xyFlowInstance)}
              onMouseUp={() => handleMouseUp(xyFlowInstance)}
              onTouchEnd={() => handleMouseUp(xyFlowInstance)}
            >
              <button
                className='positionHandler'
                data-active={active ?? -1}
                onMouseDown={() => handleMouseDown(handlerIndex, xyFlowInstance, id)}
                onTouchStart={() => handleMouseDown(handlerIndex, xyFlowInstance, id)}
                onContextMenu={(event) => handleContextMenu(event, handlerIndex, xyFlowInstance, id)}
                onTouchEnd={(event) => handleLongPress(event, id, handlerIndex, xyFlowInstance)}
              ></button>
            </div>
          </div>
        </EdgeLabelRenderer>
      ))}
    </>
  );
}
