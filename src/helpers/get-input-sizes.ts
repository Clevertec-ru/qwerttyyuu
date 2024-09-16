import { NodeUiVariants, StyleNodeVariants } from '../types/node-ui-variants';

type SizesType = {
  width?: number;
  height?: number;
};

const paddings = {
  [NodeUiVariants.Rectangle]: 50,
  [NodeUiVariants.Rhombus]: 40,
  [NodeUiVariants.Ellipse]: 40,
};

const minSizes = { width: 80, height: 40 };

export const getInputSizes = (originalSize: SizesType, spySizes: SizesType, uiType: StyleNodeVariants): SizesType => {
  let result = { width: originalSize.width, height: originalSize.height };
  switch (uiType) {
    case NodeUiVariants.Rectangle || NodeUiVariants.RectangleOutlined: {
      if (spySizes.width) {
        result.width =
          spySizes.width < minSizes.width ? minSizes.width : spySizes.width + paddings[NodeUiVariants.Rectangle];
      }

      return result;
    }
    case NodeUiVariants.EllipseOutlined || NodeUiVariants.EllipseOutlinedDashed || NodeUiVariants.Ellipse: {
      if (spySizes.width) {
        result.width = spySizes.width < minSizes.width ? minSizes.width : spySizes.width;
      }
      return result;
    }
    case NodeUiVariants.Rhombus || NodeUiVariants.RhombusOutlined: {
      if (spySizes.width) {
        result.width = spySizes.width < minSizes.width ? minSizes.width : spySizes.width;
      }
      return result;
    }
    default:
      return result;
  }
};
