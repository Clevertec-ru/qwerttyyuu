import { Handle, Position, NodeProps } from '@xyflow/react';

import styles from './custom-text-node.module.css';

import { TextOrNumberNodeType } from '../../types/custom-nodes-variants';
import { isTextNodeData } from '../../helpers/is-text-node-data';

export const CustomTextNode = ({ data }: NodeProps<TextOrNumberNodeType>) => (
  <>
    <Handle type='target' position={Position.Top} />
    <div className={styles.wrapper}>{isTextNodeData(data) ? data.text : data.number}</div>
    <Handle type='source' position={Position.Bottom} />
  </>
);
