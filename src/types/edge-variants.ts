import { Edge } from '@xyflow/react';
import { BuiltInEdge } from '@xyflow/react';

export enum EdgeMarkersVariants {
  StartMarked = 'startMarked',
  EndMarked = 'endMarked',
  BothMarked = 'bothMarked',
}

export enum CustomEdgeVariants {
  Marked = 'customMarked',
}

export type MarkersVariants = `${EdgeMarkersVariants}`;

export type EdgeDataType = { markerType: `${EdgeMarkersVariants}` };

export type CustomEdge = Edge<EdgeDataType, CustomEdgeVariants.Marked>;

export type AppEdgeType = BuiltInEdge | CustomEdge;
