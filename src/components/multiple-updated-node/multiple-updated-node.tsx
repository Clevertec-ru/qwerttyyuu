import { ChangeEventHandler, useRef, useState } from 'react';
import { Handle, NodeProps, Position } from '@xyflow/react';

import { isTextNodeData } from '../../helpers/is-text-node-data';
import { UpdatedNodeType } from '../../types/custom-nodes-variants';
import { SwitchedUiComponent } from '../../hoc/switched-ui-component';
import { DeleteNodeButton } from '../delete-node-button';
import { getAddDeleteButtonPosition } from '../../helpers/get-add-delete-button-position';
import { AddNodeButton } from '../add-node-button';
import { useAdaptSizesNodes } from '../../hooks/use-adapt-sizes-nodes';
import { useDebounceCallback } from '../../hooks/use-debounce-callback';
import { getInputSizes } from '../../helpers/get-input-sizes';

import styles from './multiple-updated-node.module.css';

export const MultipleUpdatedNode = ({ data, id }: NodeProps<UpdatedNodeType>) => {
  if (!data.multipleHandles) return null;

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

  const {
    bottomHandles,
    leftHandles,
    rightHandles,
    topHandles,
    bottomHandleType,
    leftHandleType,
    rightHandleType,
    topHandleType,
  } = data.multipleHandles;

  const { add: stylesDeleteBtn, delete: stylesAddBtn } = getAddDeleteButtonPosition(data.wrapperStyle);

  const topHandlesArr = Array.from({ length: topHandles || 0 });
  const leftHandlesArr = Array.from({ length: leftHandles || 0 });
  const rightHandlesArr = Array.from({ length: rightHandles || 0 });
  const bottomHandlesArr = Array.from({ length: bottomHandles || 0 });

  return (
    <>
      {Boolean(topHandles) &&
        topHandlesArr.map((_, index) => (
          <Handle
            key={`top${index}`}
            type={topHandleType ?? 'source'}
            position={Position.Top}
            id={`top${index}`}
            style={{ left: topHandlesArr.length === 1 ? undefined : 30 + index * 30 }}
          />
        ))}
      {Boolean(leftHandles) &&
        leftHandlesArr.map((_, index) => (
          <Handle
            key={`left${index}`}
            type={leftHandleType ?? 'source'}
            position={Position.Left}
            id={`left${index}`}
            style={{ top: leftHandlesArr.length === 1 ? undefined : index * 10 }}
          />
        ))}
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
      {Boolean(rightHandles) &&
        rightHandlesArr.map((_, index) => (
          <Handle
            key={`right${index}`}
            type={rightHandleType ?? 'source'}
            position={Position.Right}
            id={`right${index}`}
            style={{ top: rightHandlesArr.length === 1 ? undefined : index * 10 }}
          />
        ))}
      {Boolean(bottomHandles) &&
        bottomHandlesArr.map((_, index) => (
          <Handle
            key={`bottom${index}`}
            type={bottomHandleType ?? 'source'}
            position={Position.Bottom}
            id={`bottom${index}`}
            style={{ left: bottomHandlesArr.length === 1 ? undefined : 10 + index * 10 }}
          />
        ))}
    </>
  );
};
