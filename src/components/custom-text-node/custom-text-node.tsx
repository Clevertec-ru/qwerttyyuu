import { Handle, Position, NodeProps } from '@xyflow/react';
import classnames from 'classnames';

import { HandleVariants, TextOrNumberNodeType } from '../../types/custom-nodes-variants';
import { isTextNodeData } from '../../helpers/is-text-node-data';
import { SwitchedUiComponent } from '../../hoc/switched-ui-component';
import { NodeUiVariants } from '../../types/node-ui-variants';

import styles from './custom-text-node.module.css';

export const CustomTextNode = ({ data, sourcePosition, targetPosition }: NodeProps<TextOrNumberNodeType>) => {
  const targetMode = data.handleTypes && data.handleTypes === HandleVariants.TargetOnly;
  const sourceMode = data.handleTypes && data.handleTypes === HandleVariants.SourceOnly;
  return (
    <>
      {(!data.handleTypes || targetMode) && <Handle type='target' position={targetPosition ?? Position.Top} />}
      <SwitchedUiComponent variant={data.wrapperStyle} onDelete={data.onDelete}>
        <div className={classnames(styles.content)}>
          <div
            className={classnames(styles.text, {
              [styles.triangle]: data.wrapperStyle === NodeUiVariants.Triangle,
              [styles.centered]: data.wrapperStyle !== NodeUiVariants.Triangle,
            })}
          >
            {isTextNodeData(data) ? data.text : data.number}
          </div>
        </div>
      </SwitchedUiComponent>
      {(!data.handleTypes || sourceMode) && <Handle type='source' position={sourcePosition ?? Position.Bottom} />}
    </>
  );
};
