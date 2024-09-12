import { CSSProperties, FC, PropsWithChildren } from 'react';
import classnames from 'classnames';
import styles from './rectangle-node.module.css';

type RectangleNodeProps = {
  outlined?: boolean;
} & CSSProperties;

export const RectangleNode: FC<PropsWithChildren<RectangleNodeProps>> = ({
  children,
  outlined = false,
  ...stylesProps
}) => (
  <div className={classnames(styles.rectangle, { [styles.outlined]: outlined })} style={stylesProps}>
    {children}
  </div>
);
