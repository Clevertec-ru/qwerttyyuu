import { NodeUiVariants, StyleNodeVariants } from '../types/node-ui-variants';

type SizesType = {
  width?: number;
  height?: number;
};

const paddings = {
  [NodeUiVariants.Rectangle]: 60,
  [NodeUiVariants.Rhombus]: 10,
  [NodeUiVariants.Ellipse]: 50,
  [NodeUiVariants.Triangle]: 10,
};

const minSizes = { width: 80, height: 40 };

export const getInputSizes = (originalSize: SizesType, spySizes: SizesType, uiType: StyleNodeVariants): SizesType => {
  let result = { width: originalSize.width, height: originalSize.height };
  switch (uiType) {
    case NodeUiVariants.Rectangle:
    case NodeUiVariants.RectangleOutlined: {
      if (spySizes.width) {
        result.width =
          spySizes.width < minSizes.width ? minSizes.width : spySizes.width + paddings[NodeUiVariants.Rectangle];
      }
      return result;
    }
    case NodeUiVariants.EllipseOutlined:
    case NodeUiVariants.EllipseOutlinedDashed:
    case NodeUiVariants.Ellipse: {
      if (spySizes.width) {
        result.width =
          spySizes.width < minSizes.width ? minSizes.width : spySizes.width + paddings[NodeUiVariants.Ellipse];
      }
      return result;
    }
    case NodeUiVariants.Rhombus:
    case NodeUiVariants.RhombusOutlined: {
      // console.log('SPY', spySizes, 'ORIGIN', originalSize);
      if (spySizes.width) {
        result.width =
          spySizes.width < minSizes.width ? minSizes.width : spySizes.width + paddings[NodeUiVariants.Rhombus];
        result.height = result.width;
      }
      return result;
    }
    case NodeUiVariants.Triangle:
    case NodeUiVariants.TriangleTop: {
      // console.log('SPY', spySizes, 'ORIGIN', originalSize);
      if (spySizes.width) {
        result.width =
          spySizes.width < minSizes.width ? minSizes.width : spySizes.width + paddings[NodeUiVariants.Rhombus];
      }
      if (spySizes.height) {
        result.height =
          spySizes.height < minSizes.height ? minSizes.height : spySizes.height + paddings[NodeUiVariants.Triangle];
      }
      return result;
    }
    default:
      return result;
  }
};
