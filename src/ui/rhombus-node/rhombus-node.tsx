import { CSSProperties, FC, PropsWithChildren } from 'react';
import classnames from 'classnames';

import styles from './rhombus-node.module.css';

type RhombusNodeProps = {
  outlined?: boolean;
  initialHeight?: string;
} & CSSProperties;

export const RhombusNode: FC<PropsWithChildren<RhombusNodeProps>> = ({
  children,
  outlined = false,
  initialHeight,
  ...stylesProps
}) => (
  <div
    className={classnames(styles.rhombus, { [styles.outlined]: outlined })}
    style={{
      ...stylesProps,
      height: initialHeight ? initialHeight : undefined,
    }}
  >
    {children}
  </div>
);
