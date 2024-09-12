import { FC, memo } from 'react';
import { Handle, Position } from '@xyflow/react';

import styles from './color-picker-node.module.css';

type ColorPickerNodeProps = {
  data: {
    color: string;
    onChange: () => void;
  };
  isConnectable: boolean;
};

export const ColorPickerNode: FC<ColorPickerNodeProps> = memo(({ data, isConnectable }) => {
  return (
    <>
      <Handle type='target' position={Position.Left} className={styles.handle} isConnectable={isConnectable} />
      <div>
        Color: <strong>{data.color}</strong>
      </div>
      <input type='color' onChange={data.onChange} defaultValue={data.color} />
      <Handle
        type='source'
        position={Position.Right}
        id='a'
        className={styles.handleTop}
        isConnectable={isConnectable}
      />
    </>
  );
});
