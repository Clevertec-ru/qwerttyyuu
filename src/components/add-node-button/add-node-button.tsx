import { CSSProperties, FC } from 'react';

import imgAdd from '../../assets/images/addIcon.png';

import styles from './add-node-button.module.css';

type AddNodeButtonProps = { id: string } & CSSProperties;

export const AddNodeButton: FC<AddNodeButtonProps> = ({ id, ...stylesProps }) => {
  return (
    <button onClick={() => console.log(id)} className={styles.addButton} style={stylesProps}>
      <img src={imgAdd} alt='add node' className={styles.image} />
    </button>
  );
};
