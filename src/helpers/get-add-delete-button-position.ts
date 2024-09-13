import { CSSProperties } from 'react';

import { NodeUiVariants, StyleNodeVariants } from '../types/node-ui-variants';

export const getAddDeleteButtonPosition = (
  uiVariant: StyleNodeVariants
): { add: CSSProperties; delete: CSSProperties } => {
  switch (uiVariant) {
    case NodeUiVariants.Ellipse: {
      return { add: { bottom: -8, right: 15 }, delete: { bottom: -8, right: -7 } };
    }
    case NodeUiVariants.EllipseOutlined: {
      return { add: { bottom: -10, right: 15 }, delete: { bottom: -10, right: -7 } };
    }
    case NodeUiVariants.EllipseOutlinedDashed: {
      return { add: { bottom: -12, right: 15 }, delete: { bottom: -12, right: -7 } };
    }
    case NodeUiVariants.Rhombus: {
      return { add: { bottom: 14, left: '28%' }, delete: { bottom: 14, right: '28%' } };
    }
    case NodeUiVariants.RhombusOutlined: {
      return { add: { bottom: 20, left: '32%', zIndex: 3 }, delete: { bottom: 20, right: '32%', zIndex: 3 } };
    }
    case NodeUiVariants.Triangle: {
      return { add: { right: '32%', top: '1%' }, delete: { right: '15%', top: '1%' } };
    }
    default:
      return { add: {}, delete: {} };
  }
};
