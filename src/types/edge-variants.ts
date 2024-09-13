import { Edge } from '@xyflow/react';
import { BuiltInEdge } from '@xyflow/react';

export enum EdgeMarkersVariants {
  StartMarked = 'startMarked',
  EndMarked = 'endMarked',
  BothMarked = 'bothMarked',
}

export enum CustomEdgeVariants {
  Marked = 'customMarked',
  Positionable = 'positionable',
}

export type MarkersVariants = `${EdgeMarkersVariants}`;

export type EdgeDataType = { markerType: `${EdgeMarkersVariants}`; isHovered?: boolean };

export type PositionHandler = {
  x: number;
  y: number;
  active: number | undefined;
};

export type EdgeDataPositionable = {
  type: string;
  positionHandlers: PositionHandler[];
  isHoveredEdge?: boolean;
};

export type CustomEdge = Edge<EdgeDataType, CustomEdgeVariants.Marked>;

export type PositionableEdgeType = Edge<EdgeDataPositionable, CustomEdgeVariants.Positionable>;

export type AppEdgeType = BuiltInEdge | CustomEdge;
