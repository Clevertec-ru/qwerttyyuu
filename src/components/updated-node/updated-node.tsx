import { Handle, Position, NodeProps } from '@xyflow/react';
import { ChangeEventHandler } from 'react';
import { useState } from 'react';

import { UpdatedNodeType } from '../../types/custom-nodes-variants';
import { isTextNodeData } from '../../helpers/is-text-node-data';
import { SwitchedUiComponent } from '../../hoc/switched-ui-component';

export const UpdatedNode = ({ data }: NodeProps<UpdatedNodeType>) => {
  const [value, setValue] = useState(() => (isTextNodeData(data) ? data.text : data.number));

  const onValueChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Handle type='target' position={Position.Top} />
      <SwitchedUiComponent variant={data.wrapperStyle}>
        <label>
          <input type={isTextNodeData(data) ? 'text' : 'number'} value={value} onChange={onValueChange} />
        </label>
      </SwitchedUiComponent>
      <Handle type='source' position={Position.Bottom} />
    </>
  );
};
