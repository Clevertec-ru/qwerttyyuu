import { CSSProperties } from 'react';

import { NodeUiVariants, StyleNodeVariants } from '../types/node-ui-variants';

export const getDeleteButtonPosition = (uiVariant: StyleNodeVariants): CSSProperties => {
  switch (uiVariant) {
    case NodeUiVariants.Ellipse: {
      return { bottom: -8, right: 10 };
    }
    case NodeUiVariants.EllipseOutlined: {
      return { bottom: -10, right: 5 };
    }
    case NodeUiVariants.EllipseOutlinedDashed: {
      return { bottom: -12, right: 5 };
    }
    case NodeUiVariants.Rhombus: {
      return { bottom: 14, right: '27%' };
    }
    case NodeUiVariants.RhombusOutlined: {
      return { bottom: 20, right: '32%', zIndex: 3 };
    }
    case NodeUiVariants.Triangle: {
      return { right: '15%', top: '1%' };
    }
    default:
      return {};
  }
};
