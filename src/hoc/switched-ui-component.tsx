import { FC, PropsWithChildren } from 'react';

import { NodeUiVariants, StyleNodeVariants } from '../types/node-ui-variants';
import { EllipseNode } from '../ui/ellipse-node';
import { RectangleNode } from '../ui/rectangle-node';
import { RhombusNode } from '../ui/rhombus-node';
import { TriangleNode } from '../ui/triangle-node';

type SwitchedUiComponentProps = {
  variant?: StyleNodeVariants;
  initialHeight?: string;
};

export const SwitchedUiComponent: FC<PropsWithChildren<SwitchedUiComponentProps>> = ({
  variant,
  children,
  initialHeight,
}) => {
  const Component = {
    [NodeUiVariants.Ellipse]: <EllipseNode>{children}</EllipseNode>,
    [NodeUiVariants.EllipseOutlined]: <EllipseNode outlined={true}>{children}</EllipseNode>,
    [NodeUiVariants.EllipseOutlinedDashed]: (
      <EllipseNode outlined={true} dashed={true}>
        {children}
      </EllipseNode>
    ),
    [NodeUiVariants.Rectangle]: <RectangleNode>{children}</RectangleNode>,
    [NodeUiVariants.RectangleOutlined]: <RectangleNode outlined={true}>{children}</RectangleNode>,
    [NodeUiVariants.Rhombus]: <RhombusNode initialHeight={initialHeight}>{children}</RhombusNode>,
    [NodeUiVariants.RhombusOutlined]: (
      <RhombusNode initialHeight={initialHeight} outlined={true}>
        {children}
      </RhombusNode>
    ),
    [NodeUiVariants.Triangle]: <TriangleNode initialHeight={initialHeight}>{children}</TriangleNode>,
    [NodeUiVariants.TriangleTop]: (
      <TriangleNode initialHeight={initialHeight} orientation='top'>
        {children}
      </TriangleNode>
    ),
  };
  return variant ? Component[variant] : Component[NodeUiVariants.Rectangle];
};
