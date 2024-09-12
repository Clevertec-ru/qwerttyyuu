import { CSSProperties, FC, PropsWithChildren } from 'react';
import classnames from 'classnames';

import styles from './rhombus-node.module.css';

type RhombusNodeProps = { outlined?: boolean; onDelete?: () => void } & CSSProperties;

export const RhombusNode: FC<PropsWithChildren<RhombusNodeProps>> = ({
  children,
  onDelete,
  outlined = false,
  ...stylesProps
}) => (
  <div className={classnames(styles.rhombus, { [styles.outlined]: outlined })} style={stylesProps}>
    {children}

    <button onClick={onDelete} className={styles.deleteButton}>
      ✖
    </button>
  </div>
);
