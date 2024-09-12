import { CSSProperties, FC, PropsWithChildren } from 'react';
import classnames from 'classnames';

import { TriangleOrientation } from '../../types/triangle';

import styles from './triangle-node.module.css';

type TriangleNodeProps = {
  onDelete?: () => void;
  orientation?: TriangleOrientation;
} & CSSProperties;

export const TriangleNode: FC<PropsWithChildren<TriangleNodeProps>> = ({
  children,
  onDelete,
  orientation = 'bottom',
  ...stylesProps
}) => (
  <div className={classnames(styles.triangle, styles[orientation])} style={stylesProps}>
    {children}

    <button onClick={onDelete} className={styles.deleteButton}>
      ✖
    </button>
  </div>
);
