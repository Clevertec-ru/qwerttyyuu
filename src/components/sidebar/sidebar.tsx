import { FC, DragEvent, TouchEvent, useState } from 'react';
import classNames from 'classnames';
import { useReactFlow } from '@xyflow/react';

import { SwitchedUiComponent } from '../../hoc/switched-ui-component';
import { NodeUiVariants, StyleNodeVariants, variantNames } from '../../types/node-ui-variants';
import { useDragAndDropContext } from '../../context/use-drag-and-drop-context';
import { CustomNodesVariants, NumberNodeData, TextNodeData } from '../../types/custom-nodes-variants';

import styles from './sidebar.module.css';

const nodeVariants = Object.values(NodeUiVariants);

export const Sidebar: FC = () => {
  const { addNodes, screenToFlowPosition } = useReactFlow();

  const { setType, setData } = useDragAndDropContext();
  const [isDragging, setIsDragging] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<{ left: number; top: number } | null>(null);
  const [draggedNodeType, setDraggedNodeType] = useState<StyleNodeVariants>(NodeUiVariants.Rectangle);
  const { type, data } = useDragAndDropContext();
  const isRhombus = NodeUiVariants.Rhombus || NodeUiVariants.RhombusOutlined;
  const isTriangle = NodeUiVariants.Triangle || NodeUiVariants.TriangleTop;
  const onDragStart = (event: DragEvent, nodeType: CustomNodesVariants, data: TextNodeData | NumberNodeData) => {
    setType(nodeType);
    setData(data);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onTouchStart = (event: TouchEvent, nodeType: CustomNodesVariants, data: TextNodeData | NumberNodeData) => {
    setType(nodeType);
    setData(data);

    setIsDragging(true);
    setDraggedNodeType(data.wrapperStyle);

    event.preventDefault();
  };

  const onTouchMove = (event: TouchEvent) => {
    if (!isDragging) return;

    const touch = event.touches[0];

    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();

    setCurrentPosition({
      left: touch.clientX - rect.width,
      top: touch.clientY - rect.height,
    });
  };

  const onTouchEnd = (event: TouchEvent) => {
    if (isDragging) {
      setIsDragging(false);
      setDraggedNodeType(NodeUiVariants.Rectangle);
      setCurrentPosition(null);

      const touch = event.changedTouches[0];

      const position = screenToFlowPosition({
        x: touch.clientX,
        y: touch.clientY,
      });

      const newNode = {
        id: `${Date.now()}`,
        type: type ?? CustomNodesVariants.TextUpdated,
        position,
        data: data ?? { isHovered: false, wrapperStyle: NodeUiVariants.Rectangle },
      };

      addNodes(newNode);
    }
  };

  return (
    <aside onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} style={{ position: 'relative' }}>
      {nodeVariants.map((variant) => {
        return (
          <div
            key={variant}
            className={styles.dndnode}
            draggable
            onDragStart={(event) =>
              onDragStart(event, CustomNodesVariants.TextUpdated, {
                isHovered: false,
                wrapperStyle: variant,
                text: 'some text',
                initialHeight: (isRhombus || isTriangle) && 'var(--select-node-width)',
              })
            }
            onTouchStart={(event) =>
              onTouchStart(event, CustomNodesVariants.TextUpdated, {
                isHovered: false,
                wrapperStyle: variant,
                text: 'some text',
                initialHeight: (isRhombus || isTriangle) && 'var(--select-node-width)',
              })
            }
          >
            <SwitchedUiComponent variant={variant}>
              <div
                className={classNames(styles.smallText, {
                  [styles.textTop]: variant === NodeUiVariants.Triangle,
                  [styles.textBottom]: variant === NodeUiVariants.TriangleTop,
                  [styles.textCenter]: variant === NodeUiVariants.Rhombus,
                })}
              >
                {variantNames[variant]}
              </div>
            </SwitchedUiComponent>
          </div>
        );
      })}
      {isDragging && currentPosition && draggedNodeType && (
        <div
          style={{
            left: currentPosition.left,
            top: currentPosition.top,
          }}
          className={styles.cloneNode}
        >
          <SwitchedUiComponent variant={draggedNodeType}>
            <div className={classNames(styles.smallText)}>{variantNames[draggedNodeType]}</div>
          </SwitchedUiComponent>
        </div>
      )}
    </aside>
  );
};
