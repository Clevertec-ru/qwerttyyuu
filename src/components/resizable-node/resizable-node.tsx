import { Handle, Position, NodeResizer } from '@xyflow/react';
import { FC } from 'react';
import { NodeProps } from '@xyflow/react';

import styles from './resizable-node.module.css';

export const ResizableNodeSelected: FC<NodeProps> = ({ data, selected }) => {
  return (
    <>
      <NodeResizer color='var(--demo-output)' isVisible={selected} minWidth={100} minHeight={30} />
      <Handle type='target' position={Position.Left} />
      <textarea className={styles.input} defaultValue={data.label as string} />
      <Handle type='source' position={Position.Right} />
    </>
  );
};
