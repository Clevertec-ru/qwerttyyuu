import { useReactFlow } from '@xyflow/react';
import { useCallback } from 'react';

import { isTextNodeData } from '../helpers/is-text-node-data';

type ChangeNodesSizesArgs = {
  id: string;
  height: number;
  width: number;
  value: string;
};

export const useAdaptSizesNodes = () => {
  const { setNodes } = useReactFlow();

  const changeNodesSizes = useCallback((args: ChangeNodesSizesArgs) => {
    const { id, width, value } = args;

    setNodes((prevNodes) =>
      prevNodes.map((elem) => {
        const isCurrNode = id === elem.id;
        if (!isCurrNode) return elem;
        const { initialWidth, data } = elem;

        const newWidth = (initialWidth && initialWidth > width && initialWidth) || width;

        const prevData = data;
        const isTextData = isTextNodeData(data);
        let newData = { ...prevData };
        isTextData ? (newData.text = value) : (newData.number = value);
        return {
          ...elem,
          data: { ...newData, label: value },
          width: newWidth,
        };
      })
    );
  }, []);

  return { changeNodesSizes };
};
