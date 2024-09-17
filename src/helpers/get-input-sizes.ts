import { NodeUiVariants, StyleNodeVariants } from '../types/node-ui-variants';

type SizesType = {
  width?: number;
  height?: number;
};
type GetInputSizesTypeApgs = {
  originalSize: SizesType;
  spySizes: SizesType;
  uiType: StyleNodeVariants;
};

const paddings = {
  [NodeUiVariants.Rectangle]: 60,
  [NodeUiVariants.Rhombus]: 10,
  [NodeUiVariants.Ellipse]: 50,
  [NodeUiVariants.Triangle]: 10,
};

const minSizes = { width: 100, height: 40 };

export const getInputSizes = ({ originalSize, spySizes, uiType }: GetInputSizesTypeApgs): SizesType => {
  let result = { width: originalSize.width, height: originalSize.height };
  switch (uiType) {
    case NodeUiVariants.Rectangle:
    case NodeUiVariants.RectangleOutlined: {
      if (spySizes.width) {
        result.width =
          spySizes.width < minSizes.width ? minSizes.width : spySizes.width + paddings[NodeUiVariants.Rectangle];
      }
      break;
    }
    case NodeUiVariants.EllipseOutlined:
    case NodeUiVariants.EllipseOutlinedDashed:
    case NodeUiVariants.Ellipse: {
      if (spySizes.width) {
        result.width =
          spySizes.width < minSizes.width ? minSizes.width : spySizes.width + paddings[NodeUiVariants.Ellipse];
      }
      break;
    }
    case NodeUiVariants.Rhombus:
    case NodeUiVariants.RhombusOutlined: {
      if (spySizes.width && spySizes.height) {
        const squareSide = Math.sqrt(spySizes.width * spySizes.height);
        const widthBlock = Math.round(squareSide * 2) - paddings[NodeUiVariants.Rhombus];
        result.width = widthBlock < minSizes.width ? minSizes.width : widthBlock + paddings[NodeUiVariants.Rhombus];
        result.height = result.width;
      }

      break;
    }
    case NodeUiVariants.Triangle:
    case NodeUiVariants.TriangleTop: {
      if (spySizes.width && spySizes.height) {
        const baseWidth = (100 / 60) * spySizes.width;
        const triangleHeight = Math.sqrt(2) * spySizes.height;
        result.width = baseWidth < minSizes.width ? minSizes.width : baseWidth;
        result.height = triangleHeight < minSizes.height ? minSizes.height : triangleHeight;
      }

      break;
    }
    default:
      break;
  }
  return {
    width: result.width ? Math.floor(result.width) : result.width,
    height: result.height ? Math.floor(result.height) : result.height,
  };
};
