import { Position, NodeResizeControl } from '@xyflow/react';
import { FC } from 'react';
import { NodeProps } from '@xyflow/react';

import { RectangleNode } from '../../ui/rectangle-node';
import { CustomHandle } from '../custom-handle';
import resizeIcon from '../../assets/images/resizeIcon.svg';
import { DeleteNodeButton } from '../delete-node-button';
import { ResizableNodeType } from '../../types/custom-nodes-variants';
import { AddNodeButton } from '../add-node-button';

import styles from './resizable-node.module.css';

export const ResizableNodeSelected: FC<NodeProps<ResizableNodeType>> = ({ data, selected, id }) => {
  return (
    <>
      {selected && (
        <NodeResizeControl minWidth={100} minHeight={50} maxHeight={400} maxWidth={800}>
          <div className={styles.resizerWrapper}>
            <img alt='resizer icon' src={resizeIcon} className={styles.resizeImg} />
          </div>
        </NodeResizeControl>
      )}

      <CustomHandle handleProps={{ type: 'target', position: Position.Right }} />
      <RectangleNode display='flex' alignItems='center' justifyContent='center' borderRadius='var(--radius)'>
        <label htmlFor={`area-${id}`} style={{ visibility: 'hidden', width: 0, height: 0 }}>
          Resizable content
        </label>
        <textarea
          id={`area-${id}`}
          name='resizableContent'
          className={styles.internalArea}
          defaultValue={String(data.text)}
          style={{ width: '100%', height: '100%', resize: 'none' }}
          placeholder='Resizable Node Example'
        />
      </RectangleNode>
      {data.isHovered && <DeleteNodeButton id={id} right='20%' />}
      {data.isHovered && <AddNodeButton id={id} right='calc(20% + 30px)' />}
      <CustomHandle handleProps={{ type: 'source', position: Position.Left }} />
    </>
  );
};
