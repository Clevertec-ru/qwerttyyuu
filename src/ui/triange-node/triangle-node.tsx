import { CSSProperties, FC, PropsWithChildren } from 'react';

import styles from './triangle-node.module.css';
import classnames from 'classnames';
import { TriangleOrientation } from '../../types/triangle';

type TriangleNodeProps = {
  orientation?: TriangleOrientation;
} & CSSProperties;

export const TriangleNode: FC<PropsWithChildren<TriangleNodeProps>> = ({
  children,
  orientation = 'bottom',
  ...stylesProps
}) => (
  <div className={classnames(styles.triangle, orientation)} style={stylesProps}>
    {children}
  </div>
);
