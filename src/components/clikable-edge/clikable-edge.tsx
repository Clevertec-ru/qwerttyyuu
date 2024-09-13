import { BaseEdgeProps } from '@xyflow/react';
import { useState } from 'react';

import './clikable-edge.css';
import { getMidPoint } from '../../helpers/get-mid-point';

type ClickableEdgeProps = {
  onClick: (event: React.MouseEvent<SVGPathElement>) => void;
  onDelete: () => void;
};

const ClickableEdge: React.FC<BaseEdgeProps & ClickableEdgeProps> = ({
  id,
  path,
  style,
  markerEnd,
  markerStart,
  interactionWidth = 20,
  onClick,
  onDelete,
}) => {
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);

  let timer = 0;

  const midPoint = getMidPoint(path);

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
          onContextMenu={(e) => {
            e.preventDefault();
            setShowDeleteIcon(!showDeleteIcon);
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            timer = Date.now();
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            if (Date.now() - timer > 600) {
              setShowDeleteIcon(!showDeleteIcon);
            }
          }}
        />
      )}
      {showDeleteIcon && (
        <text
          x={midPoint.x}
          y={midPoint.y - 10}
          className='delete-icon'
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          ❌
        </text>
      )}
    </>
  );
};

ClickableEdge.displayName = 'BaseEdge';

export default ClickableEdge;
