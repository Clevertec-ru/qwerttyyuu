import { FC } from 'react';
import classNames from 'classnames';

import { SwitchedUiComponent } from '../../hoc/switched-ui-component';
import { NodeUiVariants, variantNames } from '../../types/node-ui-variants';

import styles from './sidebar.module.css';

const nodeVariants = Object.values(NodeUiVariants);

export const Sidebar: FC = () => {
  return (
    <aside>
      {nodeVariants.map((variant) => (
        <div key={variant} className={styles.dndnode} draggable>
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
