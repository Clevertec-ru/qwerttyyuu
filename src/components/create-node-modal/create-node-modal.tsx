import { SubmitHandler, useForm } from 'react-hook-form';
import React, { useState } from 'react';

import { CreateNodeType } from '../../types/create-node-type.ts';
import { useAddNodeBySettings } from '../../hooks/use-add-node-by-settings.ts';
import { NodeUiVariants, variantNames } from '../../types/node-ui-variants.ts';
import { SwitchedUiComponent } from '../../hoc/switched-ui-component.tsx';

import styles from './create-node-modal.module.css';

type CreateNodeModalProps = {
  setIsModalOpen: (isOpen: boolean) => void;
  isModalOpen: boolean;
}

export const CreateNodeModal = ({ setIsModalOpen, isModalOpen }: CreateNodeModalProps) => {
  const { addNewNode } = useAddNodeBySettings();
  const [uniqueId, setUniqueId] = useState(20);
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<CreateNodeType>();
  const [selectedVariant, setSelectedVariant] = useState<NodeUiVariants>(NodeUiVariants.Rectangle);

  const handleShapeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value as NodeUiVariants;
    setSelectedVariant(selected);
  };


  const onSubmit: SubmitHandler<CreateNodeType> = (data) => {
    setUniqueId(prevState => prevState + 1);
    addNewNode({ ...data, uniqueId: uniqueId.toString() });
    setIsModalOpen(false);
    reset();
  };
  const handleClose = () => {
    setIsModalOpen(false);
    reset();
  };

  // const handleTypes = () => Object.values(HandleTypeOptions).map((variant, index) => (
  //   <option key={index} value={variant}>
  //     {variant}
  //   </option>
  // ))


  return (
    isModalOpen && <div className={styles.modal} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
          <label>Text</label>
          <input className={styles.input} type="text" {...register('nodeText', { required: true })} />
          <label>Shape</label>
          <select className={styles.select} {...register('nodeShape', { required: true })} onChange={handleShapeChange}
                  value={selectedVariant}>
            {Object.values(NodeUiVariants).map((variant) => (
              <option key={variant} value={variant}>
                {variantNames[variant]}
              </option>
            ))}
          </select>
          <div className={styles.nodePreview}>
            <SwitchedUiComponent variant={selectedVariant} />
          </div>
          <label>Top dots count</label>
          {(selectedVariant === NodeUiVariants.Rectangle || selectedVariant === NodeUiVariants.RectangleOutlined) &&
            <div className={styles.container}><input className={styles.input}
                                                type={'number'} {...register('topDotsCount')} />
              {/*<label>Top dots type</label>*/}
              {/*<select {...register('topDotsType')}>{handleTypes()}</select>*/}
              <label>Left dots count</label>
              <input className={styles.input} type={'number'} {...register('leftDotsCount')} />
              {/*<label>Left dots type</label>*/}
              {/*<select {...register('leftDotsType')}>{handleTypes()}</select>*/}
              <label>Bottom dots count</label>
              <input className={styles.input} type={'number'} {...register('botDotsCount')} />
              {/*<label>Bottom dots type</label>*/}
              {/*<select {...register('botDotsType')}>{handleTypes()}</select>*/}
              <label>Right dots count</label>
              <input className={styles.input} type={'number'} {...register('rightDotsCount')} />
              {/*<label>Right dots type</label>*/}
              {/*<select {...register('rightDotsType')}>{handleTypes()}</select>*/}</div>}
          <label>Height</label>
          <input className={styles.input} type={'number'} {...register('height', { required: true })}></input>
          <label>Width</label>
          <input className={styles.input} type={'number'} {...register('width', { required: true })}></input>
          <button type={'submit'}>submit</button>
        </form>
      </div>
    </div>
  );
};