import { Handle, Position, NodeProps } from '@xyflow/react';
import { ChangeEventHandler, Fragment, useRef } from 'react';
import { useState } from 'react';

import { HandleVariants, UpdatedNodeType } from '../../types/custom-nodes-variants';
import { isTextNodeData } from '../../helpers/is-text-node-data';
import { SwitchedUiComponent } from '../../hoc/switched-ui-component';
import { DeleteNodeButton } from '../delete-node-button';
import { getAddDeleteButtonPosition } from '../../helpers/get-add-delete-button-position';
import { AddNodeButton } from '../add-node-button';
import { useAdaptSizesNodes } from '../../hooks/use-adapt-sizes-nodes';
import { useDebounceCallback } from '../../hooks/use-debounce-callback';
import { getInputSizes } from '../../helpers/get-input-sizes';

import styles from './updated-node.module.css';

export const UpdatedNode = ({ data, sourcePosition, targetPosition, id }: NodeProps<UpdatedNodeType>) => {
  const inputSpyRef = useRef<HTMLSpanElement>(null);
  const inputLabelRef = useRef<HTMLLabelElement>(null);
  const [value, setValue] = useState(() => (isTextNodeData(data) ? data.text : data.number));
  const { changeNodesSizes } = useAdaptSizesNodes();
  const debouncedChanger = useDebounceCallback(changeNodesSizes);

  const onValueChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
    const spySizes = { height: inputSpyRef.current?.offsetHeight, width: inputSpyRef.current?.offsetWidth };
    const originalSizes = inputLabelRef.current?.getBoundingClientRect();

    const { height, width } = getInputSizes(
      { width: originalSizes?.width, height: originalSizes?.height },
      spySizes,
      data.wrapperStyle
    );

    debouncedChanger({ id, width, height, value: event.target.value });
  };

  const targetMode = data.handleTypes && data.handleTypes === HandleVariants.TargetOnly;
  const sourceMode = data.handleTypes && data.handleTypes === HandleVariants.SourceOnly;
  const { delete: stylesDeleteBtn, add: stylesAddBtn } = getAddDeleteButtonPosition(data.wrapperStyle);

  return (
    <Fragment key={`flow-node-${id}`}>
      {(!data.handleTypes || targetMode) && <Handle type='target' position={targetPosition ?? Position.Top} />}
      <span className={styles.spyInput} ref={inputSpyRef}>
        {value.replace(/ /g, '\u00A0')}
      </span>
      <SwitchedUiComponent variant={data.wrapperStyle}>
        <label className={styles.label} ref={inputLabelRef}>
          <input
            className={styles.input}
            type={isTextNodeData(data) ? 'text' : 'number'}
            value={value}
            onChange={onValueChange}
          />
        </label>
        {data.isHovered && <DeleteNodeButton id={id} {...stylesDeleteBtn} />}
        {data.isHovered && <AddNodeButton id={id} {...stylesAddBtn} />}
      </SwitchedUiComponent>
      {(!data.handleTypes || sourceMode) && <Handle type='source' position={sourcePosition ?? Position.Bottom} />}
    </Fragment>
  );
};
