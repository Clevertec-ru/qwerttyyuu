import { useReactFlow } from '@xyflow/react';
import { useCallback } from 'react';

import { isTextNodeData } from '../helpers/is-text-node-data';
import { NodeUiVariants } from '../types/node-ui-variants';

type ChangeNodesSizesArgs = {
  id: string;
  height: number;
  width: number;
  value: string;
};

export const useAdaptSizesNodes = () => {
  const { setNodes } = useReactFlow();

  const changeNodesSizes = useCallback(({ id, width, value, height }: ChangeNodesSizesArgs) => {
    setNodes((prevNodes) =>
      prevNodes.map((elem) => {
        const isCurrNode = id === elem.id;
        if (!isCurrNode) return elem;
        const { initialWidth, data, initialHeight } = elem;

        const newWidth = (initialWidth && initialWidth > width && initialWidth) || width;
        const newHeight = (initialHeight && initialHeight > height && initialHeight) || height;

        const prevData = data;
        const isTextData = isTextNodeData(data);
        let newData = { ...prevData };
        isTextData ? (newData.text = value) : (newData.number = value);
        const isRhombus =
          data?.wrapperStyle === NodeUiVariants.Rhombus || data?.wrapperStyle === NodeUiVariants.RhombusOutlined;
        const isTriangle =
          data?.wrapperStyle === NodeUiVariants.Triangle || data?.wrapperStyle === NodeUiVariants.TriangleTop;
        if (isRhombus) {
          return {
            ...elem,
            data: { ...newData, label: value },
            width: newWidth,
            height: newWidth,
          };
        } else if (isTriangle) {
          return {
            ...elem,
            data: { ...newData, label: value },
            width: newWidth,
            height: newHeight,
          };
        }
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
