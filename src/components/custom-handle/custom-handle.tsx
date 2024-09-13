import { Handle, HandleProps } from '@xyflow/react';
import { CSSProperties, FC } from 'react';

import classes from './custom-handle.module.css';

type CustomHandleProps = {
  handleProps: HandleProps;
} & CSSProperties;

export const CustomHandle: FC<CustomHandleProps> = ({ handleProps, ...stylesProps }) => {
  const position = handleProps.position;
  return <Handle {...handleProps} style={{ [position]: -3, ...stylesProps }} className={classes.handle} />;
};
