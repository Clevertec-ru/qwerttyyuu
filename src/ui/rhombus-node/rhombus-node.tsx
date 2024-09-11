import { CSSProperties, FC, PropsWithChildren } from 'react';

import styles from './rhombus-node.module.css';
import classnames from 'classnames';

type RhombusNodeProps = { outlined?: boolean } & CSSProperties;

export const RhombusNode: FC<PropsWithChildren<RhombusNodeProps>> = ({
  children,
  outlined = false,
  ...stylesProps
}) => (
  <div className={classnames(styles.rhombus, { [styles.outlined]: outlined })} style={stylesProps}>
    {outlined ? <div className={styles.inner}>{children}</div> : children}
  </div>
);
