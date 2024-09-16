import { EdgeLabelRenderer, EdgeProps, useReactFlow } from '@xyflow/react';

import ClickableEdge from '../clikable-edge/clikable-edge';
import './positionable-edge.css';
import {
  handleContextMenu,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleTouchMove,
  handleTouchStart,
} from '../../helpers/positionable-edge-handlers';
import { getPathFunction } from '../../helpers/get-path';
import { generateEdgeSegments } from '../../helpers/generate-edge-segments';

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
  const type = data?.type ?? 'smoothstep';
  const edgeSegmentsCount = positionHandlers.length + 1;

  const pathFunction = getPathFunction(type);

  const edgeSegmentsArray = generateEdgeSegments({
    edgeSegmentsCount,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    positionHandlers,
    pathFunction,
  });

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
                onTouchStart={(event) => handleTouchStart(event, handlerIndex, xyFlowInstance, id)}
                onContextMenu={(event) => handleContextMenu(event, handlerIndex, xyFlowInstance, id)}
              />
            </div>
          </div>
        </EdgeLabelRenderer>
      ))}
    </>
  );
}
