import { FC } from 'react';
import classNames from 'classnames';

import styles from './custom-button.module.css';

type CustomButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
};

export const CustomButton: FC<CustomButtonProps> = ({ onClick, children, disabled, className }: CustomButtonProps) => {
  return (
    <button className={classNames(styles.customButton, className)} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
