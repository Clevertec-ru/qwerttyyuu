import { BaseEdgeProps } from '@xyflow/react';

type ClickableEdgeProps = {
  onClick: (event: React.MouseEvent<SVGPathElement>) => void;
};
const ClickableEdge: React.FC<BaseEdgeProps & ClickableEdgeProps> = ({
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

ClickableEdge.displayName = 'BaseEdge';

export default ClickableEdge;
