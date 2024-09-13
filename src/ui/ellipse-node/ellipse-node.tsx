import { CSSProperties, FC, PropsWithChildren } from 'react';
import classnames from 'classnames';

import styles from './ellipse-node.module.css';

type EllipseNodeProps = {
  outlined?: boolean;
  dashed?: boolean;
} & CSSProperties;

export const EllipseNode: FC<PropsWithChildren<EllipseNodeProps>> = ({
  children,
  outlined = false,
  dashed = false,
  ...stylesProps
}) => {
  return (
    <div
      className={classnames(styles.ellipse, { [styles.outlined]: outlined, [styles.dashed]: dashed })}
      style={stylesProps}
    >
      {children}
    </div>
  );
};
