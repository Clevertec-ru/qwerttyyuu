import { DragEvent, FC } from 'react';
import classNames from 'classnames';

import { SwitchedUiComponent } from '../../hoc/switched-ui-component';
import { NodeUiVariants, variantNames } from '../../types/node-ui-variants';
import { useDragAndDropContext } from '../../context/use-drag-and-drop-context';
import { CustomNodesVariants, NumberNodeData, TextNodeData } from '../../types/custom-nodes-variants';
import { DRAG_EFFECT_NAME } from '../../constants/drag-effect-name';

import styles from './sidebar.module.css';

const nodeVariants = Object.values(NodeUiVariants);

export const Sidebar: FC = () => {
  const { setType, setData } = useDragAndDropContext();

  const onDragStart = (event: DragEvent, nodeType: CustomNodesVariants, data: TextNodeData | NumberNodeData) => {
    console.log(data);
    setType(nodeType);
    setData(data);
    event.dataTransfer.effectAllowed = DRAG_EFFECT_NAME;
  };

  return (
    <aside>
      {nodeVariants.map((variant) => (
        <div
          key={variant}
          className={styles.dndnode}
          draggable
          onDragStart={(event) =>
            onDragStart(event, CustomNodesVariants.TextUpdated, {
              isHovered: false,
              wrapperStyle: variant,
              text: 'some text',
            })
          }
        >
          <SwitchedUiComponent variant={variant}>
            <div
              className={classNames(styles.smallText, {
                [styles.textTop]: variant === NodeUiVariants.Triangle,
                [styles.textBottom]: variant === NodeUiVariants.TriangleTop,
              })}
            >
              {variantNames[variant]}
            </div>
          </SwitchedUiComponent>
        </div>
      ))}
    </aside>
  );
};
