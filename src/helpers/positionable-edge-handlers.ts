import { Edge, Node, ReactFlowInstance } from '@xyflow/react';

import { EdgeData } from '../components/positionable-edge/positionable-edge';

export function handleMouseDown(handlerIndex: number, xyFlowInstance: ReactFlowInstance<Node, Edge>, id: string) {
  xyFlowInstance.setEdges((edges) => {
    const edgeIndex = edges.findIndex((edge) => edge.id === id);
    const { positionHandlers } = edges[edgeIndex].data as EdgeData;

    positionHandlers[handlerIndex].active = edgeIndex;
    return edges;
  });
}

export function handleMouseMove(
  event: React.MouseEvent,
  active: number | undefined,
  handlerIndex: number,
  xyFlowInstance: ReactFlowInstance<Node, Edge>
) {
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
}

export function handleTouchMove(
  event: React.TouchEvent,
  active: number | undefined,
  handlerIndex: number,
  xyFlowInstance: ReactFlowInstance<Node, Edge>
) {
  const target = event.target as HTMLElement;
  let activeEdge = parseInt(target.dataset.active ?? '-1');
  if (activeEdge === -1) {
    return;
  }
  const position = xyFlowInstance.screenToFlowPosition({
    x: event.touches[0].clientX,
    y: event.touches[0].clientY,
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
}

export function handleMouseUp(xyFlowInstance: ReactFlowInstance<Node, Edge>) {
  xyFlowInstance.setEdges((edges) => {
    edges.forEach((edge) => {
      const { positionHandlers } = edge.data as EdgeData;

      positionHandlers.forEach((handler) => {
        handler.active = -1;
      });
    });
    return edges;
  });
}
