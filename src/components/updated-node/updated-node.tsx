import { Handle, Position, NodeProps } from '@xyflow/react';
import { ChangeEventHandler } from 'react';
import { useState } from 'react';

import { HandleVariants, UpdatedNodeType } from '../../types/custom-nodes-variants';
import { isTextNodeData } from '../../helpers/is-text-node-data';
import { SwitchedUiComponent } from '../../hoc/switched-ui-component';
import { DeleteNodeButton } from '../delete-node-button';
import { getDeleteButtonPosition } from '../../helpers/get-delete-button-position';

import styles from './updated-node.module.css';

export const UpdatedNode = ({ data, sourcePosition, targetPosition, id }: NodeProps<UpdatedNodeType>) => {
  const [value, setValue] = useState(() => (isTextNodeData(data) ? data.text : data.number));

  const onValueChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };

  const targetMode = data.handleTypes && data.handleTypes === HandleVariants.TargetOnly;
  const sourceMode = data.handleTypes && data.handleTypes === HandleVariants.SourceOnly;
  const stylesDeleteBtn = getDeleteButtonPosition(data.wrapperStyle);

  return (
    <>
      {(!data.handleTypes || targetMode) && <Handle type='target' position={targetPosition ?? Position.Top} />}
      <SwitchedUiComponent variant={data.wrapperStyle}>
        <label className={styles.label}>
          <input
            className={styles.input}
            type={isTextNodeData(data) ? 'text' : 'number'}
            value={value}
            onChange={onValueChange}
          />
        </label>
        <DeleteNodeButton id={id} {...stylesDeleteBtn} />
      </SwitchedUiComponent>
      {(!data.handleTypes || sourceMode) && <Handle type='source' position={sourcePosition ?? Position.Bottom} />}
    </>
  );
};
