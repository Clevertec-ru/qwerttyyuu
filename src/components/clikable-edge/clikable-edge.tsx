import { BaseEdgeProps } from '@xyflow/react';
import { MouseEvent } from 'react';

type ClickableEdgeProps = {
  onClick: (event: MouseEvent<SVGPathElement>) => void;
};
export const ClickableEdge: React.FC<BaseEdgeProps & ClickableEdgeProps> = ({
  id,
  path,
  style,
  markerEnd,
  markerStart,
  interactionWidth = 20,
  onClick,
}) => {
  return (
    <>
      <path
        id={id}
        style={style}
        d={path}
        fill='none'
        className='react-flow__edge-path'
        markerEnd={markerEnd}
        markerStart={markerStart}
      />
      {interactionWidth && (
        <path
          d={path}
          fill='none'
          strokeOpacity={0}
          strokeWidth={interactionWidth}
          className='react-flow__edge-interaction'
          onClick={onClick}
        />
      )}
    </>
  );
};
