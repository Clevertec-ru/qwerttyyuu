import { BaseEdgeProps } from '@xyflow/react';
import { useState } from 'react';

import './clikable-edge.css';
import { getMidPoint } from '../../helpers/get-mid-point';
import { handleTouchStart } from '../../helpers/delete-edge-handler.ts';

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
  const [isShowDeleteIcon, setShowDeleteIcon] = useState(false);

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
            setShowDeleteIcon(!isShowDeleteIcon);
          }}
          onTouchStart={(e) => {
            handleTouchStart(e, setShowDeleteIcon, isShowDeleteIcon)
          }}
        />
      )}
      {isShowDeleteIcon && (
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
