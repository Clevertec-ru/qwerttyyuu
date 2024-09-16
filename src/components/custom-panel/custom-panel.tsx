import React, { useState } from 'react';
import { Panel, PanelPosition } from '@xyflow/react';

import { NodeUiVariants, variantNames } from '../../types/node-ui-variants';
import { CustomModal } from '../custom-modal';
import { SwitchedUiComponent } from '../../hoc/switched-ui-component';

import styles from './custom-panel.module.css';

type CustomPanelProps = {
  position: PanelPosition;
};

export const CustomPanel: React.FC<CustomPanelProps> = ({ position }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<NodeUiVariants>(NodeUiVariants.Rectangle);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value as NodeUiVariants;
    setSelectedVariant(selected);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Panel position={position}>
      <div className={styles.container}>
        <label htmlFor='node-select'>Select to add block:</label>
        <select id='node-select' onChange={handleChange} value={selectedVariant}>
          {Object.values(NodeUiVariants).map((variant) => (
            <option key={variant} value={variant}>
              {variantNames[variant]}
            </option>
          ))}
        </select>
        <div className={styles.node}>
          <SwitchedUiComponent variant={selectedVariant} />
        </div>

        <CustomModal isOpen={isModalOpen} onClose={handleCloseModal} variant={selectedVariant} />
      </div>
    </Panel>
  );
};
