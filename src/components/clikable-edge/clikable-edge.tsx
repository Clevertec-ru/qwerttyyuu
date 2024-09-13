import { BaseEdgeProps } from '@xyflow/react';

type ClickableEdgeProps = {
  onClick: (event: React.MouseEvent<SVGPathElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<SVGPathElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<SVGPathElement>) => void;
};
const ClickableEdge: React.FC<BaseEdgeProps & ClickableEdgeProps> = ({
  id,
  path,
  style,
  markerEnd,
  markerStart,
  interactionWidth = 20,
  onMouseEnter,
  onMouseLeave,
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
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
      {interactionWidth && (
        <path
          d={path}
          fill='none'
          strokeOpacity={0}
          strokeWidth={interactionWidth}
          className='react-flow__edge-interaction'
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      )}
    </>
  );
};

ClickableEdge.displayName = 'BaseEdge';

export default ClickableEdge;
