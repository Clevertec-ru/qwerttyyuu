import { CSSProperties, FC, PropsWithChildren } from 'react';
import classnames from 'classnames';

import { TriangleOrientation } from '../../types/triangle';

import styles from './triangle-node.module.css';

type TriangleNodeProps = {
  orientation?: TriangleOrientation;
  initialHeight?: string;
} & CSSProperties;

export const TriangleNode: FC<PropsWithChildren<TriangleNodeProps>> = ({
  children,
  orientation = 'bottom',
  initialHeight,
  ...stylesProps
}) => {
  return (
    <div
      className={classnames(styles.triangle, styles[orientation])}
      style={{
        ...stylesProps,
        height: initialHeight ? initialHeight : undefined,
      }}
    >
      {children}
    </div>
  );
};
