import { Edge } from '@xyflow/react';
import { CSSProperties } from 'react';

import { defaultMarkerStyles } from './default-marker-styles';

const defaultLabelStyles: CSSProperties = { fontSize: 14, padding: 5 };

export const initialEdges: Edge[] = [
  {
    id: 'el1-2',
    source: '1',
    sourceHandle: 'bottom0',
    target: '2',
    type: 'positionableedge',
    data: {
      type: 'straight',
      positionHandlers: [],
    },
    ...defaultMarkerStyles,
  },
  {
    id: 'el1-11',
    source: '1',
    sourceHandle: 'top0',
    target: '11',
    type: 'positionableedge',
    data: {
      type: 'default',
      positionHandlers: [],
    },
    ...defaultMarkerStyles,
  },
  {
    id: 'el1-12',
    source: '1',
    sourceHandle: 'top1',
    target: '12',
    type: 'positionableedge',
    data: {
      type: 'default',
      positionHandlers: [],
    },
    ...defaultMarkerStyles,
  },
  {
    id: 'el1-13',
    source: '1',
    sourceHandle: 'top2',
    target: '13',
    type: 'positionableedge',
    data: {
      type: 'default',
      positionHandlers: [],
    },
    ...defaultMarkerStyles,
  },
  {
    id: 'el1-7',
    source: '1',
    sourceHandle: 'right0',
    target: '7',
    labelStyle: defaultLabelStyles,
    label: '1',
    type: 'positionableedge',
    data: {
      type: 'default',
      positionHandlers: [],
    },
    ...defaultMarkerStyles,
  },
  {
    id: 'el2-3',
    source: '2',
    target: '3',
    type: 'positionableedge',
    data: {
      type: 'default',
      positionHandlers: [],
    },
    ...defaultMarkerStyles,
  },
  {
    id: 'el3-4',
    source: '3',
    target: '4',
    label: '0..1',
    labelStyle: defaultLabelStyles,
    type: 'positionableedge',
    data: {
      type: 'default',
      positionHandlers: [],
    },
    ...defaultMarkerStyles,
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    label: '1..1',
    labelStyle: defaultLabelStyles,
    type: 'positionableedge',
    data: {
      type: 'default',
      positionHandlers: [],
    },
    ...defaultMarkerStyles,
  },
  {
    id: 'e5-6',
    source: '5',
    target: '6',
    type: 'positionableedge',
    data: {
      type: 'default',
      positionHandlers: [],
    },
    ...defaultMarkerStyles,
  },
  {
    id: 'el7-8',
    source: '7',
    target: '8',
    label: 'N',
    labelStyle: defaultLabelStyles,
    type: 'positionableedge',
    data: {
      type: 'default',
      positionHandlers: [],
    },
    ...defaultMarkerStyles,
  },
  {
    id: 'el8-9',
    source: '8',
    target: '9',
    sourceHandle: 'top0',
    type: 'positionableedge',
    data: {
      type: 'default',
      positionHandlers: [],
    },
    ...defaultMarkerStyles,
  },
  {
    id: 'el8-10',
    source: '8',
    target: '10',
    sourceHandle: 'top1',
    type: 'positionableedge',
    data: {
      type: 'default',
      positionHandlers: [],
    },
    ...defaultMarkerStyles,
  },
];
