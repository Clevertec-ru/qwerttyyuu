import { MiniMap } from '@xyflow/react';
import { FC } from 'react';

type MapProps = {
  bgColor: string;
};

export const Map: FC<MapProps> = ({ bgColor }) => (
  <MiniMap
    nodeStrokeColor={(n) => {
      if (n.type === 'custom') return 'var(--demo-input)';
      if (n.type === 'selectorNode') return bgColor;
      if (n.type === 'resizableNodeSelected') return 'var(--demo-output)';
      return 'var(--demo-map-bg)';
    }}
    nodeColor={(n) => {
      if (n.type === 'selectorNode') return bgColor;
      return 'var(--white)';
    }}
  />
);
