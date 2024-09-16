import React, { useState } from 'react';
import { Panel, PanelPosition } from '@xyflow/react';

import { CreateNodeModal } from '../create-node-modal/create-node-modal.tsx';

type CustomPanelProps = {
  position: PanelPosition;
};

export const CustomPanel: React.FC<CustomPanelProps> = ({ position }) => {
  const [isModalOpen, setModalOpen] = useState(false);
 

  return (
    <Panel position={position}>
      <button onClick={() =>setModalOpen(!isModalOpen)}>add block</button>
      <CreateNodeModal isModalOpen={isModalOpen} setIsModalOpen={setModalOpen}></CreateNodeModal>
    </Panel>
  );
};
