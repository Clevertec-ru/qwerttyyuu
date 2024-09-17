import React, { useState } from 'react';
import { Panel, PanelPosition } from '@xyflow/react';

import { CreateNodeModal } from '../create-node-modal/create-node-modal.tsx';
import { CustomButton } from '../custom-button/custom-button.tsx';

import styles from './custom-panel.module.css';

type CustomPanelProps = {
  position: PanelPosition;
};

export const CustomPanel: React.FC<CustomPanelProps> = ({ position }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <Panel position={position} className={styles.openBtn}>
      <CustomButton className={styles.openBtn} onClick={() => setModalOpen(!isModalOpen)}>
        add block
      </CustomButton>
      <CreateNodeModal isModalOpen={isModalOpen} setIsModalOpen={setModalOpen}></CreateNodeModal>
    </Panel>
  );
};
