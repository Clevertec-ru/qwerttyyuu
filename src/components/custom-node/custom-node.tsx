import { Handle, Position } from '@xyflow/react';
import { FC } from 'react';
import classNames from 'classnames';
import { NodeProps } from '@xyflow/react';

import styles from './custom-node.module.css';

export const CustomNode: FC<NodeProps> = ({ data, selected }) => {
  return (
    <div className={classNames(styles.node, { [styles.selectedNode]: selected })}>
      <Handle type='target' position={Position.Left} />
      <input className={styles.input} defaultValue={data.label as string} />
      <Handle type='source' position={Position.Right} />
    </div>
  );
};
