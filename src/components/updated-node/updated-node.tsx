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
import { NodeUiVariants } from '../../types/node-ui-variants';

import styles from './updated-node.module.css';

export const UpdatedNode = ({ data, sourcePosition, targetPosition, id }: NodeProps<UpdatedNodeType>) => {
  const inputSpyRef = useRef<HTMLSpanElement>(null);
  const textAreaSpyRef = useRef<HTMLTextAreaElement>(null);
  const inputLabelRef = useRef<HTMLLabelElement>(null);
  const [value, setValue] = useState(() => (isTextNodeData(data) ? data.text : data.number));
  const { changeNodesSizes } = useAdaptSizesNodes();
  const debouncedChanger = useDebounceCallback(changeNodesSizes);

  const isRhombus =
    data.wrapperStyle === NodeUiVariants.Rhombus || data.wrapperStyle === NodeUiVariants.RhombusOutlined;
  const isTriangle = data.wrapperStyle === NodeUiVariants.Triangle || data.wrapperStyle === NodeUiVariants.TriangleTop;

  const onValueChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    setValue(event.target.value);
    if (!isRhombus && !isTriangle && !inputSpyRef.current) return;
    if ((isRhombus || isTriangle) && !textAreaSpyRef.current) return;

    const spySizesInput = { height: inputSpyRef.current?.offsetHeight, width: inputSpyRef.current?.offsetWidth };

    const spySizesArea = {
      height: (textAreaSpyRef.current?.offsetHeight || 0) + (textAreaSpyRef.current?.scrollHeight || 0),
      width: textAreaSpyRef.current?.offsetWidth,
    };

    const originalSizes = inputLabelRef.current?.getBoundingClientRect();

    const { height, width } = getInputSizes({
      originalSize: { width: originalSizes?.width, height: originalSizes?.height },
      spySizes: isRhombus || isTriangle ? spySizesArea : spySizesInput,
      uiType: data.wrapperStyle,
    });

    debouncedChanger({ id, width, height, value: event.target.value });
  };

  const targetMode = data.handleTypes && data.handleTypes === HandleVariants.TargetOnly;
  const sourceMode = data.handleTypes && data.handleTypes === HandleVariants.SourceOnly;
  const { delete: stylesDeleteBtn, add: stylesAddBtn } = getAddDeleteButtonPosition(data.wrapperStyle);

  return (
    <Fragment key={`flow-node-${id}`}>
      {(!data.handleTypes || targetMode) && <Handle type='target' position={targetPosition ?? Position.Top} />}
      {!isRhombus && !isTriangle && (
        <span className={styles.spyInput} ref={inputSpyRef}>
          {value.replace(/ /g, '\u00A0')}
        </span>
      )}

      <SwitchedUiComponent variant={data.wrapperStyle}>
        {(isRhombus || isTriangle) && (
          <textarea
            className={styles.spyArea}
            style={{
              resize: 'none',
              width: isRhombus ? '50%' : '60%',
            }}
            ref={textAreaSpyRef}
            value={value}
            readOnly={true}
          />
        )}
        <label className={styles.label} ref={inputLabelRef}>
          {!isRhombus && !isTriangle && (
            <input
              className={styles.input}
              type={isTextNodeData(data) ? 'text' : 'number'}
              value={value}
              onChange={onValueChange}
            />
          )}
          {(isRhombus || isTriangle) && (
            <textarea className={styles.textarea} value={value} style={{ resize: 'none' }} onChange={onValueChange} />
          )}
        </label>
        {data.isHovered && <DeleteNodeButton id={id} {...stylesDeleteBtn} />}
        {data.isHovered && <AddNodeButton id={id} {...stylesAddBtn} />}
      </SwitchedUiComponent>
      {(!data.handleTypes || sourceMode) && <Handle type='source' position={sourcePosition ?? Position.Bottom} />}
    </Fragment>
  );
};
