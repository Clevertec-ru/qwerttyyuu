import { FC } from 'react';

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
            <div className={styles.smallText}>{variantNames[variant]}</div>
          </SwitchedUiComponent>
        </div>
      ))}
    </aside>
  );
};
