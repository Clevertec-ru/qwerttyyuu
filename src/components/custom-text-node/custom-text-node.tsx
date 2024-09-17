import { Handle, Position, NodeProps } from '@xyflow/react';
import classnames from 'classnames';

import { HandleVariants, TextOrNumberNodeType } from '../../types/custom-nodes-variants';
import { isTextNodeData } from '../../helpers/is-text-node-data';
import { SwitchedUiComponent } from '../../hoc/switched-ui-component';
import { NodeUiVariants } from '../../types/node-ui-variants';
import { DeleteNodeButton } from '../delete-node-button';
import { getAddDeleteButtonPosition } from '../../helpers/get-add-delete-button-position';
import { AddNodeButton } from '../add-node-button';

import styles from './custom-text-node.module.css';

export const CustomTextNode = ({ data, sourcePosition, targetPosition, id }: NodeProps<TextOrNumberNodeType>) => {
  const { handleTypes, wrapperStyle, isHovered } = data;
  data;
  const targetMode = handleTypes && handleTypes === HandleVariants.TargetOnly;
  const sourceMode = handleTypes && handleTypes === HandleVariants.SourceOnly;
  const { add: stylesAddBtn, delete: stylesDeleteBtn } = getAddDeleteButtonPosition(wrapperStyle);

  return (
    <>
      {(!handleTypes || targetMode) && <Handle type='target' position={targetPosition ?? Position.Top} />}
      <SwitchedUiComponent variant={data.wrapperStyle}>
        <div className={classnames(styles.content)}>
          <div
            className={classnames(styles.text, {
              [styles.triangle]: wrapperStyle === NodeUiVariants.Triangle,
              [styles.centered]: wrapperStyle !== NodeUiVariants.Triangle,
            })}
          >
            {isTextNodeData(data) ? data.text : data.number}
          </div>
        </div>
      </SwitchedUiComponent>
      {isHovered && <DeleteNodeButton id={id} {...stylesDeleteBtn} />}
      {isHovered && <AddNodeButton id={id} {...stylesAddBtn} />}
      {(!handleTypes || sourceMode) && <Handle type='source' position={sourcePosition ?? Position.Bottom} />}
    </>
  );
};
