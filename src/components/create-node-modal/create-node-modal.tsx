import { SubmitHandler, useForm } from 'react-hook-form';

import { CreateNodeType } from '../../types/create-node-type.ts';
import { useAddNodeBySettings } from '../../hooks/use-add-node-by-settings.ts';

import styles from './create-node-modal.module.css';

type CreateNodeModalProps = {
  setIsModalOpen: (isOpen: boolean) => void;
  isModalOpen: boolean;
}

export const CreateNodeModal = ({ setIsModalOpen, isModalOpen }: CreateNodeModalProps) => {
  const { addNewNode } = useAddNodeBySettings();
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<CreateNodeType>();
  const onSubmit: SubmitHandler<CreateNodeType> = (data) => {
    addNewNode(data);
    setIsModalOpen(false);
    reset();
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };
  return (
    isModalOpen && <div className={styles.modal} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <label>Text</label>
          <input type="text" {...register('nodeText')} />
          <label>Shape</label>
          <select  {...register('nodeShape')}></select>
          <label>Top dots count</label>
          <input type={'number'} {...register('topDotsCount')}></input>
          <label>Top dots type</label>
          <select {...register('topDotsType')}></select>
          <label>Left dots count</label>
          <input type={'number'} {...register('leftDotsCount')}></input>
          <label>Left dots type</label>
          <select {...register('leftDotsType')}></select>
          <label>Bottom dots count</label>
          <input type={'number'} {...register('botDotsCount')}></input>
          <label>Bottom dots type</label>
          <select {...register('botDotsType')}></select>
          <label>Right dots count</label>
          <input type={'number'} {...register('rightDotsCount')}></input>
          <label>Right dots type</label>
          <select {...register('rightDotsType')}></select>
          <button type={'submit'}>submit</button>
        </form>
      </div>
    </div>
  );
};