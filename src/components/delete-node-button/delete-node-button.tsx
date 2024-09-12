import { CSSProperties, FC } from 'react';

import { useDeleteNode } from '../../hooks/use-delete-node';
import imgClose from '../../assets/images/removeNodeIcon.png';

import styles from './delete-node-button.module.css';

type DeleteNodeButtonProps = {
  id: string;
} & CSSProperties;

export const DeleteNodeButton: FC<DeleteNodeButtonProps> = ({ id, ...stylesProps }) => {
  const { deleteNode } = useDeleteNode();

  return (
    <button onClick={() => deleteNode(id)} className={styles.deleteButton} style={stylesProps}>
      <img src={imgClose} alt='close' className={styles.image} />
    </button>
  );
};
